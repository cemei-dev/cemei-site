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
import { updateInvestment } from "@/store/services/investment";
import { generateYearOptions } from "@/utils/generateYearOptions";
import addInvestmentFormSchema from "@/validations/addInvestment";

import { EditInvestmentModalProps } from "./types";

import InputField from "../InputField/inputField";
import { AddInvestmentForm } from "../InvestmentSection/investmentSection";
import MultiSelectField from "../MultiSelectFiled/multiSelectField";
import SelectField from "../SelectField/selectField";

export default function EditInvestmentModal({
  investment,
  isOpen,
  setIsOpen
}: EditInvestmentModalProps) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AddInvestmentForm>({
    mode: "all",
    resolver: zodResolver(addInvestmentFormSchema),
    criteriaMode: "all",
    defaultValues: {
      timerange: investment.timerange as
        | "1º Trimestre"
        | "2º Trimestre"
        | "3º Trimestre"
        | "4º Trimestre"
        | "Ano inteiro"
        | undefined,
      amount: investment.amount,
      category: investment.category,
      year: investment.year
    }
  });

  const editMutation = useMutation(
    async (data: AddInvestmentForm) => {
      try {
        await updateInvestment(investment.id, {
          ...data
        });
      } catch (error) {
        console.error("Investment update error:", error);
        errorToast("Erro ao editar investimento. Por favor, tente novamente.");
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["investments"]
        });
        setLoading(false);
        setIsOpen(false);
        successToast("Investimento editado com sucesso");
      },
      onError: () => {
        setLoading(false);
      }
    }
  );

  const onSubmit = (data: AddInvestmentForm) => {
    setLoading(true);
    editMutation.mutateAsync(data);
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = generateYearOptions(currentYear, 10);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar investimento</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col items-center justify-between gap-5">
          <div className="flex w-full flex-col justify-between gap-5 sm:flex-row">
            <InputField
              currency={true}
              label="Qual o valor investido em educação?"
              type="number"
              name="amount"
              placeholder="R$ "
              register={register}
              formErrors={errors}
            />
            <SelectField
              label="Qual o período do investimento?"
              name="timerange"
              placeholder=""
              control={control}
              options={[
                { value: "1º Trimestre", label: "1º Trimestre" },
                { value: "2º Trimestre", label: "2º Trimestre" },
                { value: "3º Trimestre", label: "3º Trimestre" },
                { value: "4º Trimestre", label: "4º Trimestre" },
                { value: "Ano inteiro", label: "Ano inteiro" }
              ]}
              formErrors={errors}
            />
          </div>
          <div className="flex w-full flex-col justify-between gap-5 sm:flex-row">
            <MultiSelectField
              control={control}
              name="category"
              options={[
                { label: "Criação de escolas", value: "Criação de escolas" },
                { label: "Reforma em escolas", value: "Reforma em escolas" },
                {
                  label: "Salário de professores",
                  value: "Salário de professores"
                },
                {
                  label: "Programas de capacitação",
                  value: "Programas de capacitação"
                }
              ]}
              placeholder="Categoria"
              formErrors={errors}
            />
            <SelectField
              name="year"
              control={control}
              formErrors={errors}
              placeholder="Ano"
              options={yearOptions}
            />
          </div>
        </div>
        <DialogFooter className="pt-5">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
            className="w-full"
            type="submit"
          >
            {loading ? (
              <LoadingComponent className="h-4 w-4" />
            ) : (
              "Editar investimento"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
