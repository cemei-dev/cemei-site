import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Image URL is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg"
      }
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
