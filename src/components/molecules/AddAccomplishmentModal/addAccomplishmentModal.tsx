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
import useProfile from "@/hooks/queries/useProfile";
import { errorToast, successToast } from "@/hooks/useAppToast";
import useAuth from "@/hooks/useAuth";
import { addAccomplishment } from "@/store/services/accomplishment";
import { uploadImage } from "@/store/services/firebaseStorage";
import {
  AddAccomplishmentForm,
  AddAccomplishmentSchema
} from "@/validations/addAccomplishment";

import { AddAccomplishmentModalProps } from "./types";

import InputField from "../InputField/inputField";
import TextAreaField from "../TextareaField/textareaField";
import UploadAreaControlled from "../UploadAreaControlled/uploadAreaControlled";

export default function AddAccomplishmentModal({
  isOpen,
  setIsOpen
}: AddAccomplishmentModalProps) {
  const { userUid } = useAuth();
  const { data: user } = useProfile(userUid);
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AddAccomplishmentForm>({
    mode: "all",
    resolver: zodResolver(AddAccomplishmentSchema),
    criteriaMode: "all"
  });
  const hasImage = watch("imageUrl");

  const addMutation = useMutation(
    async (data: AddAccomplishmentForm) => {
      let imageUrl = "";
      if (data.imageUrl) {
        try {
          const url = await uploadImage(data.imageUrl, "accomplishment/");
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
        await addAccomplishment({
          ...data,
          imageUrl,
          cityId: user?.cityId ?? ""
        });
      } catch (error) {
        console.error("Accomplishment registration error:", error);
        errorToast("Erro ao cadastrar realização. Por favor, tente novamente.");
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
        successToast("Realização cadastrada com sucesso");
      },
      onError: () => {
        setLoading(false);
      }
    }
  );

  const onSubmit = (data: AddAccomplishmentForm) => {
    setLoading(true);
    addMutation.mutateAsync(data);
    reset();
  };

  const isMultiplesValid = watch("text") !== "" && watch("title") !== "";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Adicionar nova realização
          </DialogTitle>
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
            required
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isMultiplesValid || !isValid || loading || !hasImage}
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
