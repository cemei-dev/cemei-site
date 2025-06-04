import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  Check,
  EllipsisVertical,
  RefreshCcw,
  X
} from "lucide-react";

import { ActionEntity } from "@/common/entities/action";
import Button from "@/components/atoms/Button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useActionResults } from "@/hooks/queries/useActionResults";
import { errorToast, successToast } from "@/hooks/useAppToast";
import { deleteAction } from "@/store/services/action";
import { timestampToDate } from "@/utils/timestampToDate";

import AddResultModal from "../AddResultModal/addResultModal";
import { ConfirmationModal } from "../ConfirmationModal/confirmationModal";
import EditActionModal from "../EditActionModal/editActionModal";
import ResultCard from "../ResultCard/resultCard";

export default function ActionParticle({
  action,
  index
}: {
  action: ActionEntity;
  index: number;
}) {
  const isNotStarted = action.status === "not_started";
  const isInProgress = action.status === "incomplete";
  const isCompleted = action.status === "completed";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isAddResultModalOpen, setIsAddResultModalOpen] = useState(false);

  const { data: results } = useActionResults(action.id);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (id: string) => {
      try {
        await deleteAction(id);
      } catch (error) {
        setDeleteLoading(false);
        errorToast("Erro ao deletar ação.");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["actions"]);
        successToast("Ação deletada com sucesso.");
        setDeleteLoading(false);
      }
    }
  );

  const handleDeleteAction = (id: string) => {
    setDeleteLoading(true);
    deleteMutation.mutateAsync(id);
  };

  return (
    <div className="flex w-full flex-col gap-14" key={action.id}>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between rounded-3xl p-4">
          <div className="flex items-center gap-6">
            <h2 className="text-[56px]">{index}</h2>
            <div className="flex flex-col">
              <p className="text-2xl">{action.title}</p>
              <p className="line-clamp-1 text-lg font-light">{action.obs}</p>
            </div>
          </div>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <div
                onClick={() => setIsDropdownOpen(true)}
                className="cursor-pointer rounded-xl p-2 transition-all duration-300 hover:bg-gray-100"
              >
                <EllipsisVertical />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setIsEditModalOpen(true);
                  setIsDropdownOpen(false);
                }}
                className="text-lg"
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setIsDropdownOpen(false);
                }}
                className="text-lg"
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-1 rounded-full border ${isNotStarted && "border-intense-pink"} ${isInProgress && "border-intense-purple"} ${isCompleted && "border-intense-blue"} px-4 py-1`}
          >
            <p
              className={`mt-1 text-sm ${isNotStarted && "text-intense-pink"} ${isInProgress && "text-intense-purple"} ${isCompleted && "text-intense-blue"}`}
            >
              {isCompleted && "Completa"}
              {isInProgress && "Em andamento"}
              {isNotStarted && "Não iniciada"}
            </p>
            {isCompleted && <Check className="h-5 w-5 text-intense-blue" />}
            {isInProgress && (
              <RefreshCcw className="h-5 w-5 text-intense-purple" />
            )}
            {isNotStarted && <X className="h-5 w-5 text-intense-pink" />}
          </div>
          <div className="flex items-center gap-4 rounded-full border border-[#BEA7DA] px-4 py-1">
            <div>
              <CalendarDays className="h-5 w-5 text-intense-purple" />
            </div>{" "}
            <p className="mt-1 text-sm">
              Prazo: {timestampToDate(action.date).toLocaleDateString("pt-BR")}
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-full border border-[#BEA7DA] px-4 py-1">
            {" "}
            <p>
              Essa ação {!action.needMoney && "não"} precisa de dinheiro da
              prefeitura
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-end gap-2 place-self-end">
        <Button
          onClick={() => setIsAddResultModalOpen(true)}
          size="sm"
          className="text-base"
        >
          Compartilhe os resultados dessa ação
        </Button>
      </div>
      {results && results.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <p className="mb-4 text-3xl">Resultados da ação</p>
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      )}

      <EditActionModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        action={action}
      />

      <ConfirmationModal
        title="Deletar ação"
        content="Tem certeza que deseja deletar essa ação?"
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        loading={deleteLoading}
        actionLabel="Deletar"
        action={() => handleDeleteAction(action.id)}
      />
      <AddResultModal
        isOpen={isAddResultModalOpen}
        setIsOpen={setIsAddResultModalOpen}
        actionId={action.id}
        goalId={action.goalId}
        cityId={action.cityId}
      />
    </div>
  );
}
