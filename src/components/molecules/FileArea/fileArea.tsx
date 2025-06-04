import React, { useCallback, useEffect, useRef, useState } from "react";

import { Upload } from "lucide-react";
import { FaFile } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import LoadingComponent from "@/components/atoms/Loading/loading";

import { FileAreaTypeProps } from "./types";

export const FileArea = ({
  handleFileChange,
  className,
  error,
  defaultFileName,
  internalText,
  loading
}: FileAreaTypeProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | undefined>();
  const [fileTypeError, setFileTypeError] = useState(false);

  const acceptedFileTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  useEffect(() => {
    if (defaultFileName) {
      setFileName(defaultFileName.name);
      setIsUploadSuccess(true);
    }
  }, [defaultFileName]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileTypeError(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (files) {
      for (const file of Array.from(files)) {
        if (!acceptedFileTypes.includes(file.type)) {
          setFileTypeError(true);
          return;
        }
        setFileName(file.name);
        handleFileChange(file);
        setIsUploadSuccess(true);
      }
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={twMerge(
          "cursor-pointer rounded-3xl border-2 border-[#BEA7DA] px-12 py-16 text-center transition-all",
          className
        )}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={openFileExplorer}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingComponent className="h-8 w-8" />
          </div>
        ) : isUploadSuccess && !fileTypeError ? (
          <div className="flex flex-col items-center justify-between gap-2">
            <FaFile color="#BEA7DA" size={52} />
            <span className="line-clamp-2 text-intense-purple">{fileName}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload color="#BEA7DA" className="h-20 w-20" />
            <p className="mb-2 text-sm">
              <span className="font-medium text-intense-purple">
                {internalText ?? "Procurar arquivo"}
              </span>
            </p>
            <p className="text-xs text-[#BEA7DA]">
              Arquivos suportados: .pdf, .docx
            </p>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          multiple
          onChange={(e) => {
            setFileTypeError(false);
            handleFiles(e.target.files);
          }}
          ref={fileInputRef}
          accept={acceptedFileTypes.join(",")}
        />
      </div>
      <p className="mt-2 text-center text-[#EB473D]">
        {error || (fileTypeError && "Tipo de arquivo não suportado")}
      </p>
    </div>
  );
};
