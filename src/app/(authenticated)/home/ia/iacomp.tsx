"use client";

import { useRef, useState, useEffect } from "react";

import { renderAsync } from "docx-preview";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/loadingSpinner";
import ZoomComponent from "@/components/atoms/ZoomComponent/zoomComponent";
import AIChat from "@/components/molecules/AIChat/AIChat";
import { FileArea } from "@/components/molecules/FileArea/fileArea";

export default function IAComponent() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState<number>(100);
  const iframeRef1 = useRef<HTMLIFrameElement>(null);
  const docxContainerRef = useRef<HTMLDivElement>(null);
  const [fileUrl, setFileUrl] = useState<string>();

  const handleFileChange = (newFile: File) => {
    setLoading(true);
    setFile(newFile);
    setLoading(false);
  };

  useEffect(() => {
    if (file) {
      if (file.type === "application/pdf") {
        setFileUrl(URL.createObjectURL(file));
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const renderDocx = async () => {
          if (docxContainerRef.current) {
            const arrayBuffer = await file.arrayBuffer();
            await renderAsync(
              arrayBuffer,
              docxContainerRef.current,
              undefined,
              {
                className: "docx"
              }
            );
            // Aplica o zoom ao conteúdo do documento
            const docxContent = docxContainerRef.current.querySelector(".docx");
            if (docxContent) {
              (docxContent as HTMLElement).style.transform =
                `scale(${zoom / 100})`;
              (docxContent as HTMLElement).style.transformOrigin = "top left";
            }
          }
        };
        renderDocx();
      } else {
        setFileUrl(URL.createObjectURL(file));
      }
    }
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [file, zoom]);

  return (
    <>
      <div
        className={`flex h-full w-full flex-col items-start justify-start gap-20 pt-14 ${
          loading && "blur-md"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            onClick={() => router.back()}
            className="flex cursor-pointer items-center justify-center rounded-2xl p-2 transition-all duration-300 hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </div>

          <h1 className="text-[32px] font-semibold">
            Resumo do PME com Inteligência Artificial
          </h1>
        </div>
        {file ? (
          <div className="flex w-full items-center justify-center gap-64">
            <div className="flex w-max items-center justify-start gap-12 rounded-3xl border border-[#BEA7DA] p-6">
              <div className="flex h-[900px] flex-col gap-6 rounded-3xl bg-[#F2F2F2] p-8">
                <p className="text-sm font-semibold"> {file.name}</p>
                <ZoomComponent
                  zoom={zoom}
                  setZoom={setZoom}
                  iframeRef={
                    file.type === "application/pdf" ? iframeRef1 : undefined
                  }
                />
                {file.type ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                  <div
                    ref={docxContainerRef}
                    className="h-full w-[39vw] overflow-auto rounded-3xl bg-white p-8"
                  />
                ) : (
                  <iframe
                    ref={iframeRef1}
                    src={`${fileUrl}#zoom=${zoom}&toolbar=0`}
                    className="h-full w-[39vw] rounded-3xl"
                  />
                )}
              </div>
              <div className="flex h-[900px] w-[39vw] flex-col gap-6 rounded-3xl bg-[#F2F2F2] p-8">
                <AIChat file={file} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full items-center justify-center gap-64">
              <Image
                src="/images/ai-icon.svg"
                alt="AI"
                width={270}
                height={270}
              />
              <div className="flex flex-col items-start justify-start gap-8 rounded-3xl border border-[#AC8BD6] p-8">
                <h4 className="text-start text-3xl text-intense-purple">
                  Veja algumas possibilidades!
                </h4>
                <div className="flex items-center justify-between gap-20">
                  <div className="flex items-center gap-4">
                    <h2 className="text-[56px] text-intense-purple">1</h2>
                    <p className="w-72 text-xl">
                      Simplificar linguagem para fácil entendimento do Público
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <h2 className="text-[56px] text-intense-purple">2</h2>
                    <p className="w-64 text-xl">
                      Pedir por textos mais divertidos utilizando emojis.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-20">
                  <div className="flex items-center gap-4">
                    <h2 className="text-[56px] text-intense-purple">3</h2>
                    <p className="w-72 text-xl">
                      Restruturar texto podendo dividir conteúdo por tópicos.{" "}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <h2 className="text-[56px] text-intense-purple">4</h2>
                    <p className="w-64 text-xl">
                      Destacar informações mais relevantes para facilitar a
                      tomada de decisões.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-20 mt-12 flex w-full flex-col items-start justify-center gap-14">
              <h4 className="text-2xl">
                Carregue o documento PME e nossa IA faz o resto. Receba um
                resumo detalhado em segundos.
              </h4>
              <FileArea handleFileChange={handleFileChange} />
            </div>
          </>
        )}
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}
