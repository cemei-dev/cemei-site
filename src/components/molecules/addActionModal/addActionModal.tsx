import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import Button from "@/components/atoms/Button/button";
import LoadingComponent from "@/components/atoms/Loading/loading";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { errorToast, successToast } from "@/hooks/useAppToast";
import { addAction } from "@/store/services/action";
import { AddActionForm, AddActionSchema } from "@/validations/addAction";

import { AddActionModalProps } from "./types";

import ControlledCalendar from "../ControlledCalendar/controlledCalendar";
import InputField from "../InputField/inputField";
import SelectField from "../SelectField/selectField";
import TextAreaField from "../TextareaField/textareaField";

export default function AddActionModal({
  isOpen,
  setIsOpen,
  goalId,
  strategyId,
  axisId,
  cityId
}: AddActionModalProps) {
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
  } = useForm<AddActionForm>({
    mode: "all",
    resolver: zodResolver(AddActionSchema),
    criteriaMode: "all"
  });

  const addMutation = useMutation(
    async (data: AddActionForm) => {
      const data1 = data.date as Date;
      const convDate = Timestamp.fromDate(data1);
      try {
        await addAction({
          ...data,
          goalId,
          date: convDate,
          strategyId,
          educationalAxisId: axisId,
          cityId
        });
      } catch (error) {
        console.error("Action registration error:", error);
        errorToast("Erro ao cadastrar ação. Por favor, tente novamente.");
        throw error;
      }
    },
    {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries({
          queryKey: ["actions"]
        });
        setLoading(false);
        setIsOpen(false);
        successToast("Ação cadastrada com sucesso");
      },
      onError: () => {
        setLoading(false);
      }
    }
  );

  const onSubmit = (data: AddActionForm) => {
    setLoading(true);
    addMutation.mutateAsync(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Adicionar nova ação</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <InputField
            label="Qual é a nova ação?"
            placeholder="Escreva aqui"
            formErrors={errors}
            register={register}
            className="w-full"
            name="title"
          />
          <div className="flex w-full justify-between">
            <ControlledCalendar
              label="Data"
              setValue={setValue}
              watch={watch}
              placeholder="dd/mm/aaaa"
              formErrors={errors}
              register={register}
              defaultValue={new Date().toLocaleDateString("pt-BR")}
              className="w-56 rounded-xl"
              name="date"
              control={control}
            />
            <SelectField
              label="Status"
              placeholder="Selecione"
              formErrors={errors}
              control={control}
              className="w-56"
              name="status"
              options={[
                { value: "not_started", label: "Não iniciada" },
                { value: "incomplete", label: "Em andamento" },
                { value: "completed", label: "Completa" }
              ]}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-start gap-2 ">
              <Checkbox
                onCheckedChange={() => {
                  setValue("needMoney", true);
                }}
                checked={watch("needMoney")}
              />
              <p className="font-corisande text-lg">
                Precisa de dinheiro da prefeitura
              </p>
              <CircleDollarSign />
            </div>
            <div className="flex w-full items-center justify-start gap-2 ">
              <Checkbox
                onCheckedChange={() => {
                  setValue("needMoney", false);
                }}
                checked={!watch("needMoney")}
              />
              <p className="font-corisande text-lg">
                Não precisa de dinheiro da prefeitura
              </p>
              <Image
                src="/images/dollar.svg"
                alt="dolar"
                width={24}
                height={24}
              />
            </div>
          </div>
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
              "Adicionar ação"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
