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
import { addGoal } from "@/store/services/goal";
import { AddGoalForm, AddGoalSchema } from "@/validations/addGoal";

import { AddGoalModalProps } from "./types";

import InputField from "../InputField/inputField";
import TextAreaField from "../TextareaField/textareaField";

export default function AddGoalModal({
  isOpen,
  setIsOpen,
  axisId
}: AddGoalModalProps) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AddGoalForm>({
    mode: "all",
    resolver: zodResolver(AddGoalSchema),
    criteriaMode: "all"
  });

  const addMutation = useMutation(
    async (data: AddGoalForm) => {
      try {
        await addGoal({
          text: data.text,
          number: data.number,
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
        <div className="flex flex-col gap-8">
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
