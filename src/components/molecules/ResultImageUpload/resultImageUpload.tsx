/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import Image from "next/image";
import { Control, UseFormSetValue } from "react-hook-form";

import { ResultArea } from "../ResultArea/resultArea";

interface ImageSelectorProps {
  name: string;
  required?: boolean;
  fixedImage1: string;
  fixedImage2: string;
  fixedImage3: string;
  fixedImage4: string;
  fixedImage5: string;
  control: Control<{
    result: string;
    imageUrl?: any;
  }>;
  setValue: UseFormSetValue<{
    result: string;
    imageUrl?: any;
  }>;
  isEdit?: boolean;
  editFile?: File;
  loading?: boolean;
}

export const ResultImageUpload = ({
  name,
  setValue,
  fixedImage1,
  fixedImage2,
  fixedImage3,
  fixedImage4,
  fixedImage5,
  isEdit = false,
  editFile,
  loading
}: ImageSelectorProps) => {
  const [selectedImage, setSelectedImage] = useState<string | File | null>(
    null
  );

  const handleImageSelect = (image: string | File) => {
    setSelectedImage(image);
    setValue(name as "result" | "imageUrl" | `imageUrl.${string}`, image);
  };

  const getImageUrl = () => {
    if (!selectedImage) return null;
    if (typeof selectedImage === "string") return selectedImage;
    if (selectedImage instanceof File)
      return URL.createObjectURL(selectedImage);
    return null;
  };

  const imageUrl = getImageUrl();
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Imagem selecionada (topo) */}
      <p className="text-intense-purple">Adicione uma imagem</p>
      <div className="w-full rounded-2xl border">
        {imageUrl ? (
          <div className="relative h-40 w-full">
            <Image
              src={imageUrl}
              alt="Imagem selecionada"
              className="h-auto w-full rounded-2xl object-cover"
              fill
            />
          </div>
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-gray-100 text-gray-400">
            Nenhuma imagem selecionada
          </div>
        )}
      </div>

      {/* Container das opções de imagem */}
      <div className="w-full overflow-x-auto">
        <div className="flex h-48 gap-14 pb-2">
          {/* Upload de imagem */}
          <div
            onClick={() => document.getElementById(`upload-${name}`)?.click()}
          >
            <ResultArea
              loading={loading}
              internalText="Procurar arquivo"
              selectedImage={selectedImage}
              acceptedFileTypes="image/png, image/jpeg, image/webp"
              defaultFileName={isEdit ? editFile : (selectedImage as File)}
              setSelectedImage={setSelectedImage}
              handleFileChange={(file) => {
                setSelectedImage(file);
                setValue(
                  name as "result" | "imageUrl" | `imageUrl.${string}`,
                  file
                );
              }}
            />
          </div>

          {/* Imagens fixas */}
          {[
            fixedImage1,
            fixedImage2,
            fixedImage3,
            fixedImage4,
            fixedImage5
          ].map((image, index) => (
            <div
              key={index}
              className={`relative ${image === selectedImage ? "h-44 w-72" : "h-40 w-64"} flex-shrink-0 transform cursor-pointer gap-14 overflow-hidden rounded-lg transition-all duration-100 hover:bg-gray-50`}
              onClick={() => handleImageSelect(image)}
            >
              <Image
                src={image}
                alt={`Opção ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
