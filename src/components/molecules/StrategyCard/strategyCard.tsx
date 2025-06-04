import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  Check,
  CircleDollarSign,
  EllipsisVertical,
  RefreshCcw,
  X
} from "lucide-react";

import { StrategyEntity } from "@/common/entities/strategy";
import Button from "@/components/atoms/Button/button";
import AxisProgressBar from "@/components/atoms/ProgressBar/progressBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useStrategyActions } from "@/hooks/queries/useStrategyActions";
import { errorToast, successToast } from "@/hooks/useAppToast";
import { deleteStrategy } from "@/store/services/strategy";
import { timestampToDate } from "@/utils/timestampToDate";

import ActionSection from "../ActionSection/actionSection";
import { ConfirmationModal } from "../ConfirmationModal/confirmationModal";
import EditStrategyModal from "../EditStrategyModal/editStrategyModal";

export default function StrategyCard({
  strategy,
  index,
  axisId
}: {
  strategy: StrategyEntity;
  index: number;
  axisId: string;
}) {
  const { data: actions } = useStrategyActions(strategy.id);
  const allActions = actions?.length || 0;
  const doneActions =
    actions?.filter((action) => action.status === "completed").length || 0;

  const notStartedActions =
    actions?.filter((action) => action.status === "not_started").length || 0;

  const progressActions =
    actions?.filter((action) => action.status === "incomplete").length || 0;

  const isCompleted = allActions > 0 && allActions === doneActions;

  const isInProgress = progressActions > 0 || notStartedActions > 0;

  const isNotStarted = progressActions === 0 && doneActions === 0;

  const needsMoney = actions?.some((action) => action.needMoney === true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditingActions, setIsEditingActions] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (id: string) => {
      try {
        await deleteStrategy(id);
      } catch (error) {
        setDeleteLoading(false);
        errorToast("Erro ao deletar estratégia.");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["strategies"]);
        successToast("Estratégia deletada com sucesso.");
        setDeleteLoading(false);
      }
    }
  );

  const handleDeleteStrategy = async (strategyId: string) => {
    setDeleteLoading(true);
    deleteMutation.mutateAsync(strategyId);
  };

  return (
    <div className="flex w-full flex-col gap-8 rounded-3xl border border-[#BEA7DA] bg-[#FCFDFE] p-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-[56px]">{index}</h2>
          <div className="mt-6 flex flex-col gap-2">
            <p className="text-2xl">{strategy.title}</p>
            <p className="line-clamp-1 text-lg font-light">{strategy.obs}</p>
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
                setIsDropdownOpen(false);
                setIsEditModalOpen(true);
              }}
              className="text-lg"
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsDropdownOpen(false);
                setIsDeleteModalOpen(true);
              }}
              className="text-lg"
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex w-full flex-col gap-14">
        <div className="flex flex-col gap-4">
          <p className="text-xl">Avanço da estratégia</p>
          <AxisProgressBar
            className="h-14"
            progress={doneActions}
            total={allActions}
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-1 rounded-full border ${isNotStarted && "border-intense-pink"} ${isInProgress && !isNotStarted && "border-intense-purple"} ${isCompleted && "border-intense-blue"} px-4 py-1`}
            >
              <p
                className={`mt-1 text-sm ${isNotStarted && "text-intense-pink"} ${isInProgress && !isNotStarted && "text-intense-purple"} ${isCompleted && "text-intense-blue"}`}
              >
                {isCompleted && "Completa"}
                {isInProgress && !isNotStarted && "Em andamento"}
                {isNotStarted && "Não iniciada"}
              </p>
              {isCompleted && <Check className="h-5 w-5 text-intense-blue" />}
              {isInProgress && !isNotStarted && (
                <RefreshCcw className="h-5 w-5 text-intense-purple" />
              )}
              {isNotStarted && <X className="h-5 w-5 text-intense-pink" />}
            </div>
            <div className="flex items-center gap-4 rounded-full border border-[#BEA7DA] px-4 py-1">
              <div>
                <CalendarDays className="h-5 w-5 text-intense-purple" />
              </div>{" "}
              <p className="mt-1 text-sm">
                Prazo:{" "}
                {timestampToDate(strategy.date).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-intense-pink px-4 py-1">
            <p className="text-sm text-intense-pink">
              {allActions} ações cadastradas
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-xl font-light">
              Essa estratégia {!needsMoney && "não"} precisa de dinheiro da
              prefeitura.
            </p>
            {needsMoney && <CircleDollarSign strokeWidth={2} />}
          </div>
          {!isEditingActions && (
            <Button onClick={() => setIsEditingActions(true)}>Ver ações</Button>
          )}
        </div>
      </div>
      {isEditingActions && (
        <ActionSection
          strategyId={strategy.id}
          axisId={axisId}
          goalId={strategy.goalId}
          actions={actions ?? []}
          cityId={strategy.cityId}
        />
      )}
      <EditStrategyModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        strategy={strategy}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        loading={deleteLoading}
        actionLabel="Excluir"
        title="Excluir estratégia"
        content="Você tem certeza que deseja excluir essa estratégia? Essa ação não pode ser desfeita."
        action={() => handleDeleteStrategy(strategy.id)}
      />
    </div>
  );
}
