import { useEffect, useRef, useState } from "react";

import { GoogleGenAI } from "@google/genai";
import { Send } from "lucide-react";
import mammoth from "mammoth";
import * as pdfjs from "pdfjs-dist";

import ChatMessage from "@/components/atoms/ChatMessage/chatMessage";
import Input from "@/components/atoms/Input/input";
import LoadingDots from "@/components/atoms/LoadingDots/loadingDots";

// Configura o worker do PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type ChatContent = {
  role: "user" | "chat";
  content: string | React.ReactNode;
};

export default function AIChat({ file }: { file: File }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatContent[]>([
    {
      role: "user",
      content:
        "Simplifique o documento com linguagem que seja de fácil entendimento para o Público."
    },
    { role: "chat", content: <LoadingDots className="h-6" /> }
  ]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const generateBotResponse = async ({
    history
  }: {
    history: ChatContent[];
  }) => {
    try {
      // Converte o histórico para o formato esperado pelo Gemini
      const messages = history.map(({ role, content }) => ({
        role: role === "user" ? "user" : "model",
        parts: [{ text: typeof content === "string" ? content : "" }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: messages
      });

      if (!response.text) {
        throw new Error("Resposta vazia do modelo");
      }

      // Formata a resposta para usar tags HTML
      const formattedText = response.text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br />");

      // Atualiza o histórico com a nova resposta
      setChatHistory([...history, { role: "chat", content: formattedText }]);
    } catch (error) {
      console.error("Erro ao gerar resposta:", error);
      setChatHistory([
        ...history,
        {
          role: "chat",
          content:
            "Desculpe, não foi possível gerar uma resposta. Por favor, tente novamente."
        }
      ]);
    }
  };

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
  });

  interface GeminiResponse {
    text: string;
  }

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;

          if (file.type === "application/pdf") {
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            let fullText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items
                .map((item) => (item as { str: string }).str)
                .join(" ");
              fullText += pageText + "\n";
            }

            resolve(fullText);
          } else if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
            const result = await mammoth.extractRawText({ arrayBuffer });
            resolve(result.value);
          } else {
            // Para outros tipos de arquivo, tenta ler como texto
            const text = new TextDecoder().decode(arrayBuffer);
            resolve(text);
          }
        } catch (error) {
          console.error("Erro ao extrair texto do arquivo:", error);
          reject(new Error("Não foi possível extrair o texto do arquivo."));
        }
      };

      reader.onerror = (error) => {
        console.error("Erro ao ler o arquivo:", error);
        reject(new Error("Erro ao ler o arquivo."));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const FirstResponse = async (file: File): Promise<GeminiResponse> => {
    try {
      const fileContent = await extractTextFromFile(file);

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Aqui está o conteúdo do arquivo ${file.name}:\n\n${fileContent}\n\nEm português, explique de forma resumida o arquivo que está sendo enviado, em tópicos e com uma linguagem acessível. (Omita essa parte, apenas retorne o resumo em português). Não utilize asteriscos para destacar, mas sim use a tag <strong>. (repetindo, não use **, quando quiser destacar, use a tag html <strong >. em palavras **assim**, substitua por <strong>assim</strong>!) você pode usar a tag <br> para quebrar a linha. Você pode usar emojis para separar esses tópicos quebrando as linhas e adicionando espaços. Também não utilize renderizações de tabelas, opte sempre por tópicos.`
      });

      return response as GeminiResponse;
    } catch (error) {
      console.error("Erro ao processar o arquivo:", error);
      throw new Error(
        "Não foi possível processar o arquivo. Por favor, tente novamente."
      );
    }
  };

  useEffect(() => {
    if (file) {
      FirstResponse(file)
        .then((response) => {
          const text = response.text;
          setChatHistory([
            {
              role: "user",
              content:
                "Simplifique o documento com linguagem que seja de fácil entendimento para o Público."
            },
            { role: "chat", content: text }
          ]);
        })
        .catch((error) => {
          console.error("Erro detalhado:", error);
          setChatHistory([
            {
              role: "user",
              content:
                "Simplifique o documento com linguagem que seja de fácil entendimento para o Público."
            },
            {
              role: "chat",
              content:
                "Desculpe, não foi possível analisar o arquivo. Por favor, tente novamente."
            }
          ]);
        });
    }
  }, [file]);

  const handleSendMessage = () => {
    const userMessage = message.trim();
    if (!userMessage) return;
    setMessage("");
    const updatedHistory: ChatContent[] = [
      ...chatHistory,
      { role: "user", content: userMessage }
    ];
    setChatHistory(updatedHistory);
    setTimeout(() => {
      setChatHistory([
        ...updatedHistory,
        { role: "chat", content: <LoadingDots className="h-6" /> }
      ]);
      generateBotResponse({
        history: updatedHistory
      });
    }, 600);
  };

  const handleRegenerate = async () => {
    if (!file) return;
    setChatHistory([
      {
        role: "user",
        content:
          "Simplifique o documento com linguagem que seja de fácil entendimento para o Público."
      },
      { role: "chat", content: <LoadingDots className="h-6" /> }
    ]);
    try {
      const response = await FirstResponse(file);
      setChatHistory([
        {
          role: "user",
          content:
            "Simplifique o documento com linguagem que seja de fácil entendimento para o Público."
        },
        { role: "chat", content: response.text }
      ]);
    } catch (error) {
      console.error("Erro detalhado:", error);
      setChatHistory([
        {
          role: "user",
          content:
            "Simplifique o documento com linguagem que seja de fácil entendimento para o Público."
        },
        {
          role: "chat",
          content:
            "Desculpe, não foi possível analisar o arquivo. Por favor, tente novamente."
        }
      ]);
    }
  };

  return (
    <div className="relative h-full">
      <div
        ref={chatContainerRef}
        className="flex h-[90%] w-full flex-col gap-6 overflow-y-scroll overscroll-contain pr-4"
      >
        {chatHistory.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
            isFirstResponse={index === 1}
            onRegenerate={index === 1 ? handleRegenerate : undefined}
            filename={file?.name}
          />
        ))}
      </div>
      <div className="flex-1" />
      <Input
        className="absolute bottom-0 w-full rounded-2xl border-2 bg-[#FCFDFE] pr-12"
        placeholder="Pergunte sobre o documento"
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        suffix={
          message !== "" && (
            <Send
              onClick={() => {
                handleSendMessage();
              }}
              className="cursor-pointer text-intense-purple duration-300 hover:scale-125"
            />
          )
        }
      />
    </div>
  );
}
