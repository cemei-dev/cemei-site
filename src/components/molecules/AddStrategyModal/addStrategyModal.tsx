import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";
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
import { addStrategy } from "@/store/services/strategy";
import { AddStrategyForm, AddStrategySchema } from "@/validations/addStrategy";

import { AddStrategyModalProps } from "./types";

import ControlledCalendar from "../ControlledCalendar/controlledCalendar";
import InputField from "../InputField/inputField";
import TextAreaField from "../TextareaField/textareaField";

export default function AddStrategyModal({
  isOpen,
  setIsOpen,
  goalId
}: AddStrategyModalProps) {
  const { userUid } = useAuth();
  const { data: user } = useProfile(userUid);
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AddStrategyForm>({
    mode: "all",
    resolver: zodResolver(AddStrategySchema),
    criteriaMode: "all"
  });

  const addMutation = useMutation(
    async (data: AddStrategyForm) => {
      const data1 = data.date as Date;
      const convDate = Timestamp.fromDate(data1);
      try {
        await addStrategy({
          ...data,
          cityId: user?.cityId ?? "",
          goalId,
          date: convDate
        });
      } catch (error) {
        console.error("Strategy registration error:", error);
        errorToast("Erro ao cadastrar estratégia. Por favor, tente novamente.");
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["strategies"]
        });
        setLoading(false);
        setIsOpen(false);
        successToast("Estratégia cadastrada com sucesso");
      },
      onError: () => {
        setLoading(false);
      }
    }
  );

  const onSubmit = (data: AddStrategyForm) => {
    setLoading(true);
    addMutation.mutateAsync(data);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Adicionar nova estratégia
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <InputField
            label="Qual é a nova estratégia?"
            placeholder="Escreva aqui"
            formErrors={errors}
            register={register}
            className="w-full"
            name="title"
          />
          <ControlledCalendar
            label="Data"
            setValue={setValue}
            watch={watch}
            placeholder="dd/mm/aaaa"
            formErrors={errors}
            register={register}
            defaultValue={new Date().toLocaleDateString("pt-BR")}
            className="w-full rounded-xl"
            name="date"
            control={control}
          />
          <TextAreaField
            label="Detalhes e observações"
            placeholder="Escreva aqui"
            formErrors={errors}
            register={register}
            className="w-full"
            name="obs"
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
              "Adicionar estratégia"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
