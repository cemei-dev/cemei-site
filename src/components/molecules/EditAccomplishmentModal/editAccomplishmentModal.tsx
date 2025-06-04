import { useEffect, useState } from "react";

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
import { UrlToFile } from "@/lib/UrlToFile";
import { updateAccomplishment } from "@/store/services/accomplishment";
import { uploadImage } from "@/store/services/firebaseStorage";
import {
  AddAccomplishmentForm,
  AddAccomplishmentSchema
} from "@/validations/addAccomplishment";

import { EditAccomplishmentModalProps } from "./types";

import InputField from "../InputField/inputField";
import TextAreaField from "../TextareaField/textareaField";
import UploadAreaControlled from "../UploadAreaControlled/uploadAreaControlled";

export default function EditAccomplishmentModal({
  accomplishment,
  isOpen,
  setIsOpen
}: EditAccomplishmentModalProps) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<AddAccomplishmentForm>({
    mode: "all",
    resolver: zodResolver(AddAccomplishmentSchema),
    criteriaMode: "all",
    defaultValues: {
      title: accomplishment.title,
      text: accomplishment.text,
      imageUrl: accomplishment.imageUrl
    }
  });

  useEffect(() => {
    const fetchImages = async () => {
      if (accomplishment.imageUrl) {
        setImageLoading(true);
        try {
          const file = await UrlToFile(accomplishment.imageUrl);
          setImageUrl(file);

          setValue("imageUrl", file);
        } catch (error) {
          console.error("Error fetching images:", error);
        } finally {
          setImageLoading(false);
        }
      }
    };

    if (isOpen) {
      fetchImages();
    }
  }, [accomplishment.imageUrl, isOpen, setValue]);

  const editMutation = useMutation(
    async (data: AddAccomplishmentForm) => {
      let imageUrl = "";
      if (data.imageUrl) {
        try {
          const url = await uploadImage(data.imageUrl, "cities/");
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
        await updateAccomplishment(accomplishment.id, {
          ...data,
          imageUrl
        });
      } catch (error) {
        console.error("Accomplishment registration error:", error);
        errorToast("Erro ao editar realização. Por favor, tente novamente.");
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["accomplishments"]
        });
        setLoading(false);
        setIsOpen(false);
        successToast("Realização editada com sucesso");
      },
      onError: () => {
        setLoading(false);
      }
    }
  );

  const onSubmit = (data: AddAccomplishmentForm) => {
    setLoading(true);
    editMutation.mutateAsync(data);
  };

  const isMultiplesValid = watch("text") !== "" && watch("title") !== "";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar realização</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <InputField
            label="Título da realização"
            placeholder="Escreva aqui"
            formErrors={errors}
            register={register}
            className="w-full"
            name="title"
          />
          <TextAreaField
            label="Descreva o resultado dessa ação"
            placeholder="Descreva brevemente a realização, incluindo detalhes como o impacto no município, a importância do prêmio ou os resultados alcançados"
            formErrors={errors}
            register={register}
            className="w-full"
            name="text"
          />
          <UploadAreaControlled
            label="Adicione uma imagem"
            name="imageUrl"
            control={control}
            formErrors={errors}
            loading={imageLoading}
            isEdit
            editFile={imageUrl as File}
            required
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isMultiplesValid || !isValid || loading}
            className="w-full"
            type="submit"
          >
            {loading ? <LoadingComponent className="h-4 w-4" /> : "Concluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
