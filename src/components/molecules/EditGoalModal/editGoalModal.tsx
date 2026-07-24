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
import { updateGoal } from "@/store/services/goal";
import { AddGoalForm, AddGoalSchema } from "@/validations/addGoal";

import { EditGoalModalProps } from "./types";

import InputField from "../InputField/inputField";
import TextAreaField from "../TextareaField/textareaField";

export default function EditGoalModal({
  isOpen,
  setIsOpen,
  goal
}: EditGoalModalProps) {
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
    criteriaMode: "all",
    defaultValues: {
      number: goal.number,
      text: goal.text
    }
  });

  const editMutation = useMutation(
    async (data: AddGoalForm) => {
      try {
        await updateGoal(goal.id, {
          text: data.text,
          number: data.number
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
              "Atualizar meta"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
