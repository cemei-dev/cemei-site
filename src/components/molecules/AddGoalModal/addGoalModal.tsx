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
import { addGoal } from "@/store/services/goal";
import { AddGoalForm, AddGoalSchema } from "@/validations/addGoal";

import { AddGoalModalProps } from "./types";

import InputField from "../InputField/inputField";
import MultipleInputField from "../MultipleInputField/multipleInputField";
import TextAreaField from "../TextareaField/textareaField";
import UploadAreaControlled from "../UploadAreaControlled/uploadAreaControlled";

export default function AddGoalModal({
  isOpen,
  setIsOpen,
  axisId
}: AddGoalModalProps) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AddGoalForm>({
    mode: "all",
    resolver: zodResolver(AddGoalSchema),
    criteriaMode: "all",
    defaultValues: { subGoals: [] }
  });

  const addMutation = useMutation(
    async (data: AddGoalForm) => {
      let imageUrl = "";
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
        await addGoal({
          text: data.text,
          number: data.number,
          imageUrl,
          subGoals: data.subGoals ?? [],
          educationalAxisId: axisId
        });
      } catch (error) {
        console.error("Goal registration error:", error);
        errorToast("Erro ao cadastrar meta. Por favor, tente novamente.");
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["goals"] });
        setLoading(false);
        setIsOpen(false);
        successToast("Meta cadastrada com sucesso");
      },
      onError: () => {
        setLoading(false);
      }
    }
  );

  const onSubmit = (data: AddGoalForm) => {
    setLoading(true);
    addMutation.mutateAsync(data);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Adicionar nova meta</DialogTitle>
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
              "Adicionar meta"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
