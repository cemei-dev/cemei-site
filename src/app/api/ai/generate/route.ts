import admin from "firebase-admin";
import { NextResponse } from "next/server";

import { initAdmin } from "@/config/firebaseAdmin";

type VertexPart = {
  text: string;
};

type VertexContent = {
  role: "user" | "model";
  parts: VertexPart[];
};

type GenerateBody = {
  model?: string;
  contents?: VertexContent[];
};

export const runtime = "nodejs";

const DEFAULT_MODEL = "gemini-2.5-flash";
const DEFAULT_LOCATION = "us-central1";

const getTextFromVertexResponse = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return "";

  const candidates = (payload as { candidates?: unknown[] }).candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return "";

  const first = candidates[0] as {
    content?: { parts?: Array<{ text?: string }> };
  };
  const parts = first?.content?.parts;
  if (!Array.isArray(parts)) return "";

  return parts
    .map((part) => part?.text ?? "")
    .filter((text) => text.length > 0)
    .join("\n");
};

const getVertexConfig = () => {
  const project =
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PROJECT ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const location =
    process.env.GOOGLE_CLOUD_LOCATION ||
    process.env.NEXT_PUBLIC_GOOGLE_CLOUD_LOCATION ||
    DEFAULT_LOCATION;

  return {
    project,
    location
  };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateBody;
    const model = body.model || DEFAULT_MODEL;
    const contents = body.contents;

    if (!Array.isArray(contents) || contents.length === 0) {
      return NextResponse.json(
        { error: "contents é obrigatório." },
        { status: 400 }
      );
    }

    const { project, location } = getVertexConfig();
    if (!project) {
      return NextResponse.json(
        {
          error:
            "Projeto do Google Cloud não configurado. Defina GOOGLE_CLOUD_PROJECT no servidor."
        },
        { status: 500 }
      );
    }

    await initAdmin();
    const app = admin.app();
    const credential = app.options.credential;

    if (!credential) {
      return NextResponse.json(
        { error: "Credencial de service account não encontrada no servidor." },
        { status: 500 }
      );
    }

    const { access_token: accessToken } = await credential.getAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { error: "Falha ao obter token de acesso OAuth2." },
        { status: 500 }
      );
    }

    const endpoint = `https://aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:generateContent`;

    const vertexResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ contents })
    });

    const rawPayload = await vertexResponse.text();
    let payload: unknown = {};

    try {
      payload = rawPayload ? JSON.parse(rawPayload) : {};
    } catch {
      payload = { raw: rawPayload };
    }

    if (!vertexResponse.ok) {
      return NextResponse.json(
        {
          error: "Erro no Vertex AI",
          status: vertexResponse.status,
          details: payload
        },
        { status: vertexResponse.status }
      );
    }

    const text = getTextFromVertexResponse(payload);
    if (!text) {
      return NextResponse.json(
        { error: "Resposta vazia do modelo." },
        { status: 502 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Erro ao gerar conteúdo no Vertex:", error);
    const message =
      error instanceof Error ? error.message : "Erro desconhecido no servidor";
    return NextResponse.json(
      {
        error: "Falha interna ao gerar conteúdo no Vertex AI.",
        details: message
      },
      { status: 500 }
    );
  }
}
