import { useState } from "react";

import { Download, RefreshCw } from "lucide-react";
import Image from "next/image";

import LoadingComponent from "@/components/atoms/Loading/loading";
import { cn } from "@/lib/utils";

export default function ChatMessage({
  role,
  content,
  className,
  isFirstResponse = false,
  onRegenerate,
  filename
}: {
  role: "user" | "chat";
  content: string | React.ReactNode;
  className?: string;
  isFirstResponse?: boolean;
  onRegenerate?: () => void;
  filename?: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (typeof content !== "string") return;

    setIsDownloading(true);
    try {
      // Remove as tags HTML mantendo apenas o texto
      const text = content
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<strong>/gi, "")
        .replace(/<\/strong>/gi, "");

      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resumo_${filename || "documento"}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar arquivo:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full items-end",
        role === "user" ? "justify-end" : "justify-start",
        className
      )}
    >
      {role === "chat" && (
        <Image
          src="/images/ai-icon.svg"
          alt="ai"
          width={50}
          height={50}
          className="mr-2 text-white"
        />
      )}
      <div
        className={`flex flex-col justify-center gap-4 ${
          role === "user" ? "items-end" : "items-start"
        }`}
      >
        <p className="text-xl text-intense-purple">
          {role === "user" ? "Você" : "CEMEI"}
        </p>
        <div
          className={cn(
            "relative max-w-[26vw] rounded-3xl border border-[#BEA7DA] bg-[#FCFDFE] p-6",
            isFirstResponse && "pb-12"
          )}
        >
          {typeof content === "string" ? (
            <p
              className="whitespace-pre-line text-xl font-light"
              dangerouslySetInnerHTML={{
                __html: content
                  .replace(/<br\s*\/?>/gi, "<br />")
                  .replace(
                    /<strong>(.*?)<\/strong>/gi,
                    '<strong class="font-bold">$1</strong>'
                  )
              }}
            />
          ) : (
            content
          )}
          {isFirstResponse &&
            role === "chat" &&
            typeof content === "string" && (
              <div className="absolute bottom-2 right-4 flex gap-2">
                <button
                  onClick={onRegenerate}
                  className="rounded-full p-2 text-intense-purple transition-all hover:bg-gray-100"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
                <button
                  onClick={handleDownload}
                  className="rounded-full p-2 text-intense-purple transition-all hover:bg-gray-100"
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <LoadingComponent className="h-5 w-5" />
                  ) : (
                    <Download className="h-5 w-5" />
                  )}
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
