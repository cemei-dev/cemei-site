import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Button from "@/components/atoms/Button/button";
import LoadingComponent from "@/components/atoms/Loading/loading";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { errorToast, successToast } from "@/hooks/useAppToast";
import { uploadImage } from "@/store/services/firebaseStorage";
import { addActionResult } from "@/store/services/result";
import {
  AddActionResultForm,
  AddActionResultSchema
} from "@/validations/addResult";

import { AddActionResultModalProps } from "./types";

import { ResultImageUpload } from "../ResultImageUpload/resultImageUpload";
import TextAreaField from "../TextareaField/textareaField";

export default function AddResultModal({
  isOpen,
  setIsOpen,
  goalId,
  cityId,
  actionId
}: AddActionResultModalProps) {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AddActionResultForm>({
    mode: "all",
    resolver: zodResolver(AddActionResultSchema),
    criteriaMode: "all"
  });

  const handleString = (value: string) => {
    switch (value) {
      case "/images/cemei-roxo.png":
        return "https://firebasestorage.googleapis.com/v0/b/cemei-c673c.firebasestorage.app/o/actionResults%2Fcemei-roxo.png?alt=media&token=26d4c016-70be-4e4b-9b46-90c28930600d";
      case "/images/cemei-amarelo.png":
        return "https://firebasestorage.googleapis.com/v0/b/cemei-c673c.firebasestorage.app/o/actionResults%2Fcemei-amarelo.png?alt=media&token=791f19b3-80d8-4020-a19c-e931f2173f2a";
      case "/images/cemei-roxo-forte.png":
        return "https://firebasestorage.googleapis.com/v0/b/cemei-c673c.firebasestorage.app/o/actionResults%2Fcemei-roxo-forte.png?alt=media&token=66b8d987-c73c-45e2-9e44-a5ebaf153dab";
      case "/images/cemei-azul.png":
        return "https://firebasestorage.googleapis.com/v0/b/cemei-c673c.firebasestorage.app/o/actionResults%2Fcemei-azul.png?alt=media&token=6541e765-1bdb-4e4d-bf47-3375a0f02c83";
      case "/images/cemei-pink.png":
        return "https://firebasestorage.googleapis.com/v0/b/cemei-c673c.firebasestorage.app/o/actionResults%2Fcemei-pink.png?alt=media&token=2c31566d-c17f-4ef2-8520-9e60d90d1b47";
      default:
        return "";
    }
  };

  const addMutation = useMutation(
    async (data: AddActionResultForm) => {
      let imageUrl = "";
      if (data.imageUrl) {
        if (typeof data.imageUrl === "string") {
          imageUrl = handleString(data.imageUrl);
        } else if (data.imageUrl instanceof File) {
          try {
            const url = await uploadImage(data.imageUrl, "actionResults/");
            if (!url || !url.image) {
              throw new Error("Failed to get upload URL");
            }
            imageUrl = url.image as string;
          } catch (error) {
            setLoading(false);
            console.error("Image upload error:", error);
            errorToast(
              "Erro ao fazer upload da imagem. Verifique sua conexão e tente novamente."
            );
            throw error;
          }
        }
        try {
          await addActionResult({
            ...data,
            goalId,
            cityId,
            actionId,
            imageUrl
          });
        } catch (error) {
          console.error("Action result registration error:", error);
          errorToast(
            "Erro ao cadastrar resultado da ação. Por favor, tente novamente."
          );
          throw error;
        }
      }
    },
    {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries({
          queryKey: ["results"]
        });
        setLoading(false);
        setIsOpen(false);
        successToast("Resultado da ação cadastrada com sucesso");
      },
      onError: () => {
        setLoading(false);
      }
    }
  );

  const onSubmit = (data: AddActionResultForm) => {
    setLoading(true);
    addMutation.mutateAsync(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-[50%] rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Adicionar novo resultado
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <TextAreaField
            label="Qual é o resultado dessa ação?"
            placeholder="Pode ser conquistas e reconhecimentos, ações do município como compra de materiais, participação em eventos dentre outros resultados..."
            formErrors={errors}
            register={register}
            className="w-full"
            name="result"
          />
          <div className=" flex w-[46vw] items-center justify-center overflow-x-auto">
            <ResultImageUpload
              control={control}
              fixedImage1="/images/cemei-roxo.png"
              fixedImage2="/images/cemei-amarelo.png"
              fixedImage3="/images/cemei-roxo-forte.png"
              fixedImage4="/images/cemei-azul.png"
              fixedImage5="/images/cemei-pink.png"
              name="imageUrl"
              required
              setValue={setValue}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || loading}
            className="w-full"
            type="submit"
          >
            {loading ? (
              <LoadingComponent className="h-4 w-4" />
            ) : (
              "Adicionar resultado da ação"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
