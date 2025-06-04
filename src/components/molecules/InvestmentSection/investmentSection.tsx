import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/atoms/Button/button";
import InputField from "@/components/molecules/InputField/inputField";
import MultiSelectField from "@/components/molecules/MultiSelectFiled/multiSelectField";
import SelectField from "@/components/molecules/SelectField/selectField";
import useGetInvestmentsByCity from "@/hooks/queries/useGetInvestmentsByCity";
import useProfile from "@/hooks/queries/useProfile";
import { errorToast, successToast } from "@/hooks/useAppToast";
import useAuth from "@/hooks/useAuth";
import { addInvestment } from "@/store/services/investment";
import { generateYearOptions } from "@/utils/generateYearOptions";
import addInvestmentFormSchema from "@/validations/addInvestment";

import InvestmentCard from "../InvestmentCard/investmentCard";

export type AddInvestmentForm = z.infer<typeof addInvestmentFormSchema>;

export default function InvestmentSection() {
  const { userUid } = useAuth();
  const { data: user } = useProfile(userUid);
  const cityInvest = useGetInvestmentsByCity(user?.cityId || "");

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    control,
    watch,
    formState: { errors }
  } = useForm<AddInvestmentForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(addInvestmentFormSchema),
    defaultValues: {
      timerange: "1º Trimestre"
    }
  });

  const currentYear = new Date().getFullYear();
  const yearOptions = generateYearOptions(currentYear, 10);

  const addMutation = useMutation(
    async (data: AddInvestmentForm) => {
      try {
        await addInvestment({
          ...data,
          cityId: user?.cityId || ""
        });
      } catch (error) {
        console.error("Investment registration error:", error);
        errorToast(
          "Erro ao cadastrar investimento. Por favor, tente novamente."
        );
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["investments"]
        });
        setLoading(false);
        successToast("Investimento cadastrado com sucesso");
      },
      onError: () => {
        setLoading(false);
      }
    }
  );

  const onSubmit = (data: AddInvestmentForm) => {
    setLoading(true);
    addMutation.mutateAsync(data);
    reset();
  };

  const isMultiplesValid =
    watch("amount") !== "" &&
    !!watch("timerange") &&
    watch("category")?.length > 0 &&
    watch("year") !== "";
  return (
    <section className="flex w-full flex-col items-center gap-20 rounded-3xl border-2 border-purple-400 px-14 py-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl text-gray-950">Gastos com educação </h1>
        <p className="text-xl text-gray-950">
          Aqui é o espaço para prestar contas dos investimentos em educação.
          Você pode compartilhar os gastos de forma trimestral, semestral e
          anual, garantindo transparência e acompanhamento dos recursos
          públicos.
        </p>
      </div>
      <form className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full flex-wrap items-end justify-between gap-4">
          <InputField
            currency={true}
            label="Qual o valor investido em educação ?"
            type="number"
            name="amount"
            placeholder="R$ "
            register={register}
            formErrors={errors}
          />
          <SelectField
            className="w-[272px]"
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
          <MultiSelectField
            className="w-[272px]"
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
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={!isMultiplesValid || loading}
          type="submit"
          className="self-end"
        >
          Adicionar
        </Button>
      </form>
      {(cityInvest?.data ?? []).length > 0 && (
        <div className="flex w-full flex-col items-center gap-8">
          <h1 className="self-start text-2xl font-bold text-gray-black">
            Todos os investimentos
          </h1>
          {cityInvest?.data?.map((investment) => (
            <InvestmentCard
              investment={investment}
              investmentId={investment.id}
              category={investment.category}
              key={investment.id}
              amount={investment.amount}
              timerange={investment.timerange}
              year={investment.year}
            />
          ))}
        </div>
      )}
    </section>
  );
}
