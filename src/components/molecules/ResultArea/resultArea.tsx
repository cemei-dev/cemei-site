import React, { useCallback, useEffect, useRef, useState } from "react";

import { Upload } from "lucide-react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import LoadingComponent from "@/components/atoms/Loading/loading";

import { UploadAreaTypeProps } from "./types";

export const ResultArea = ({
  handleFileChange,
  className,
  acceptedFileTypes,
  error,
  defaultFileName,
  internalText,
  loading,
  selectedImage,
  setSelectedImage
}: UploadAreaTypeProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [fileTypeError, setFileTypeError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(
    defaultFileName ?? null
  );

  useEffect(() => {
    if (defaultFileName) {
      setSelectedFile(defaultFileName);
      setSelectedImage(defaultFileName);
      setIsUploadSuccess(true);
    }
  }, [defaultFileName, setSelectedImage]);

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
        handleFileChange(file);
        setSelectedFile(file);
        setIsUploadSuccess(true);
      }
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div
        className={twMerge(
          `${selectedFile === selectedImage ? "h-44 w-72" : "h-40 w-64"} cursor-pointer rounded-3xl border-2 border-[#BEA7DA] text-center transition-all`,
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
        ) : isUploadSuccess &&
          !fileTypeError &&
          selectedFile === selectedImage ? (
          <div
            className={`relative flex ${selectedFile === selectedImage ? "h-44 w-72" : "h-40 w-64"} flex-col items-center justify-between gap-2`}
          >
            <Image
              src={
                selectedFile
                  ? typeof selectedFile === "string"
                    ? selectedFile
                    : URL.createObjectURL(selectedFile)
                  : ""
              }
              alt="Imagem selecionada"
              className="h-auto w-full rounded-2xl object-cover"
              fill
            />
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-2">
            <Upload color="#BEA7DA" className="h-20 w-20" />
            <p className="text-sm">
              <span className="font-medium text-purple-400">
                {internalText ?? "Procurar arquivo"}
              </span>
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
          accept={acceptedFileTypes}
        />
      </div>
      <p className="mt-2 text-center text-[#EB473D]">
        {error || (fileTypeError && "Tipo de arquivo não suportado")}
      </p>
    </div>
  );
};
