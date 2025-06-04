import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";

import { InvestmentEntity } from "@/common/entities/investment";
import LoadingComponent from "@/components/atoms/Loading/loading";
import { errorToast, successToast } from "@/hooks/useAppToast";
import { deleteInvestment } from "@/store/services/investment";

import { ConfirmationModal } from "../ConfirmationModal/confirmationModal";
import EditInvestmentModal from "../EditInvestmentModal/editInvestmentModal";

interface InvestmentCardProps {
  amount: string;
  timerange: string;
  year: string;
  category: string[];
  investmentId: string;
  investment: InvestmentEntity;
}

const categoryStyles: Record<string, string> = {
  "Criação de escolas": "border-intense-blue text-intense-blue",
  "Reforma em escolas": "border-intense-pink text-intense-pink",
  "Salário de professores": "border-intense-purple text-intense-purple",
  "Programas de capacitação": "border-intense-yellow text-intense-yellow"
};

export default function InvestmentCard({
  amount,
  timerange,
  year,
  category,
  investmentId,
  investment
}: InvestmentCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (id: string) => {
      try {
        await deleteInvestment(id);
      } catch (error) {
        setDeleteLoading(false);
        errorToast("Erro ao deletar investimento.");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["investments"]);
        successToast("Investimento deletado com sucesso.");
        setDeleteLoading(false);
      }
    }
  );

  const handleDeleteInvestment = (id: string) => {
    setDeleteLoading(true);
    deleteMutation.mutate(id);
  };

  const formattedAmount = parseFloat(amount).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const formattedTimerange = timerange === "Ano inteiro" ? "Ano" : timerange;

  return (
    <div className="flex w-full flex-wrap items-center justify-between self-start rounded-3xl border-2 border-purple-1000 bg-gray-light p-8">
      <div className="flex w-full flex-col gap-4 sm:w-auto">
        <div className="flex flex-wrap gap-4">
          <h2 className="text-xl text-gray-black">{formattedAmount}</h2>
          <h2 className="text-xl text-gray-black">
            {formattedTimerange} de {year}
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {category.map((cat) => (
            <span
              key={cat}
              className={`rounded-full border bg-white px-6 py-2 text-sm ${
                categoryStyles[cat] || "border-gray-300 text-gray-500"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={() => setIsEditOpen(true)}
          className="flex h-full transform cursor-pointer items-center rounded-xl p-2 transition-all duration-300 hover:bg-purple-400"
        >
          <Pencil />
        </div>
        <div
          onClick={() => setIsDeleteOpen(true)}
          className="flex h-full transform cursor-pointer items-center rounded-xl p-2 transition-all duration-300 hover:bg-purple-400"
        >
          {deleteLoading ? (
            <LoadingComponent className="h-4 w-4" />
          ) : (
            <Trash2 />
          )}
        </div>
      </div>
      <EditInvestmentModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        investment={investment}
      />
      <ConfirmationModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        loading={deleteLoading}
        title="Tem certeza que deseja excluir esse investimento?"
        content="Se completar essa ação, todas as informações e dados serão perdidos."
        actionLabel="Excluir"
        action={() => handleDeleteInvestment(investmentId)}
      />
    </div>
  );
}
