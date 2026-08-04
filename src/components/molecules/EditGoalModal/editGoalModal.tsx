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
import { uploadImage } from "@/store/services/firebaseStorage";
import { updateGoal } from "@/store/services/goal";
import { AddGoalForm, AddGoalSchema } from "@/validations/addGoal";

import { EditGoalModalProps } from "./types";

import InputField from "../InputField/inputField";
import MultipleInputField from "../MultipleInputField/multipleInputField";
import TextAreaField from "../TextareaField/textareaField";
import UploadAreaControlled from "../UploadAreaControlled/uploadAreaControlled";

export default function EditGoalModal({
  isOpen,
  setIsOpen,
  goal
}: EditGoalModalProps) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [editFile, setEditFile] = useState<File>();
  const [imageLoading, setImageLoading] = useState(false);

  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AddGoalForm>({
    mode: "all",
    resolver: zodResolver(AddGoalSchema),
    criteriaMode: "all",
    defaultValues: {
      number: goal.number,
      text: goal.text,
      subGoals: goal.subGoals ?? []
    }
  });

  useEffect(() => {
    if (!isOpen || !goal.imageUrl) return;
    setImageLoading(true);
    UrlToFile(goal.imageUrl)
      .then((file) => {
        setEditFile(file);
        setValue("imageUrl", file);
      })
      .catch((error) => console.error("Error fetching goal image:", error))
      .finally(() => setImageLoading(false));
  }, [goal.imageUrl, isOpen, setValue]);

  const editMutation = useMutation(
    async (data: AddGoalForm) => {
      // ponytail: só re-envia ao storage quando o campo virou um File novo; caso contrário mantém a URL já salva
      let imageUrl = goal.imageUrl ?? "";
      if (data.imageUrl instanceof File) {
        const url = await uploadImage(data.imageUrl, "goals/");
        if (!url.image) {
          errorToast(
            "Erro ao fazer upload da imagem. Verifique sua conexão e tente novamente."
          );
          throw new Error("Failed to get upload URL");
        }
        imageUrl = url.image;
      }
      try {
        await updateGoal(goal.id, {
          text: data.text,
          number: data.number,
          imageUrl,
          subGoals: data.subGoals ?? []
        });
      } catch (error) {
        console.error("Goal update error:", error);
        errorToast("Erro ao atualizar meta. Por favor, tente novamente.");
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["goals"] });
        setLoading(false);
        setIsOpen(false);
        successToast("Meta atualizada com sucesso");
      },
      onError: () => {
        setLoading(false);
      }
    }
  );

  const onSubmit = (data: AddGoalForm) => {
    setLoading(true);
    editMutation.mutateAsync(data);
    reset(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar meta</DialogTitle>
        </DialogHeader>
        <div className="flex max-h-[60vh] flex-col gap-8 overflow-y-auto px-1">
          <InputField
            label="Número da meta"
            placeholder="Ex: 1"
            type="number"
            min={1}
            formErrors={errors}
            register={register}
            className="w-full"
            name="number"
          />
          <TextAreaField
            label="Descrição da meta"
            placeholder="Escreva aqui"
            formErrors={errors}
            register={register}
            className="w-full"
            name="text"
          />
          <MultipleInputField
            label="Submetas"
            addLabel="Adicionar submeta"
            placeholder="Escreva aqui"
            control={control}
            register={register}
            formErrors={errors}
            name="subGoals"
            min={0}
            max={20}
          />
          <UploadAreaControlled
            label="Imagem da meta"
            name="imageUrl"
            control={control}
            formErrors={errors}
            isEdit
            editFile={editFile}
            loading={imageLoading}
          />
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
              "Atualizar meta"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
