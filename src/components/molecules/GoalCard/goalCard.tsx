import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, EllipsisVertical, Plus, Search } from "lucide-react";

import { GoalEntity } from "@/common/entities/goal";
import Button from "@/components/atoms/Button/button";
import Input from "@/components/atoms/Input/input";
import LoadingComponent from "@/components/atoms/Loading/loading";
import XLProgressBar from "@/components/atoms/XLProgressBar/XLProgressBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useCityGoalStrategies } from "@/hooks/queries/useAllCityGoalStrategies";
import { useCityActions } from "@/hooks/queries/useCityActions";
import { errorToast, successToast } from "@/hooks/useAppToast";
import { deleteGoal } from "@/store/services/goal";

import AddStrategyModal from "../AddStrategyModal/addStrategyModal";
import { ConfirmationModal } from "../ConfirmationModal/confirmationModal";
import EditGoalModal from "../EditGoalModal/editGoalModal";
import GoalDetails from "../GoalDetails/goalDetails";
import { PieChartComp } from "../PieChart/pieChart";
import StrategyCard from "../StrategyCard/strategyCard";
export default function GoalCard({
  goal,
  index,
  cityId
}: {
  goal: GoalEntity;
  index: number;
  cityId: string;
}) {
  const { data: actions } = useCityActions(cityId);
  const { data: strategies } = useCityGoalStrategies(cityId, goal.id);
  const goalActions = actions?.filter((action) => action.goalId === goal.id);
  const [search, setSearch] = useState("");
  const filteredStrategies = strategies?.filter((strategy) =>
    strategy.title.toLowerCase().includes(search.toLowerCase())
  );

  const doneActions = goalActions?.filter(
    (action) => action.status === "completed"
  ).length;

  const incompletedActions = goalActions?.filter(
    (action) => action.status === "incomplete"
  ).length;

  const notStartedActions = goalActions?.filter(
    (action) => action.status === "not_started"
  ).length;

  const totalActions = goalActions?.length;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isStrategiesOpen, setIsStrategiesOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (id: string) => {
      try {
        await deleteGoal(id);
      } catch (error) {
        setDeleteLoading(false);
        errorToast("Erro ao deletar meta.");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["goals"]);
        successToast("Meta deletada com sucesso.");
        setDeleteLoading(false);
        setIsDeleteModalOpen(false);
      }
    }
  );

  if (!strategies) return <LoadingComponent />;

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h4 className="text-3xl text-intense-purple">
          Meta {goal.number ?? index}
        </h4>
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
      <div className="flex flex-col gap-[67px] rounded-3xl border border-[#BEA7DA] bg-[#F2F2F2] p-14">
        <h4 className="text-2xl">{goal.text}</h4>
        <GoalDetails goal={goal} />
        <div className="flex w-full items-center justify-between gap-8">
          <div className="flex w-full flex-col gap-4 rounded-3xl border border-[#E4CCDC] bg-[#FCFDFE] px-8 py-[73px]">
            <div className="flex w-full flex-col">
              <p className="text-xl font-medium">
                Quanto falta pra alcançarmos essa meta?
              </p>
              <p className="text-end text-lg text-intense-purple">
                {totalActions} ações
              </p>
            </div>
            <XLProgressBar
              progress={doneActions ?? 0}
              total={totalActions ?? 0}
            />
          </div>
          <div className="flex w-full flex-col gap-4 rounded-3xl border border-[#E4CCDC] bg-[#FCFDFE] p-6">
            <PieChartComp
              chartData={[
                {
                  browser: `Ações completas`,
                  visitors: doneActions ?? 0,
                  fill: "#33B1E4"
                },
                {
                  browser: `Ações em andamento`,
                  visitors: incompletedActions ?? 0,
                  fill: "#FDC139"
                },
                {
                  browser: `Ações não iniciadas`,
                  visitors: notStartedActions ?? 0,
                  fill: "#F455BD"
                }
              ]}
            />
          </div>
        </div>
        {isStrategiesOpen && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-intense-purple">Procurar estratégia</p>
            <Input
              className="bg-white"
              onChange={(e) => setSearch(e.target.value)}
              inputPrefix={
                <Search className="rounded-3xl text-intense-purple" />
              }
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <h4 className="text-[32px] font-semibold">Estratégias</h4>
          <Button onClick={() => setIsAddModalOpen(true)} suffix={<Plus />}>
            Adicionar nova estratégia
          </Button>
        </div>
        {isStrategiesOpen && filteredStrategies ? (
          filteredStrategies.length > 0 ? (
            <div className="flex w-full flex-col gap-10">
              {filteredStrategies.map((strategy, index) => (
                <StrategyCard
                  key={strategy.id}
                  index={index + 1}
                  strategy={strategy}
                  axisId={goal.educationalAxisId}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">
              Nenhuma estratégia encontrada.
            </p>
          )
        ) : filteredStrategies?.length && filteredStrategies?.length > 0 ? (
          <StrategyCard
            axisId={goal.educationalAxisId}
            index={1}
            strategy={strategies[0]}
          />
        ) : (
          <div className="flex h-56 w-full flex-col items-center justify-center gap-8 rounded-3xl border border-[#BEA7DA] bg-[#FCFDFE] p-10">
            <p className="text-center text-lg text-[#B0B0B0]">
              Adicione estratégia e suas respectivas ações do PME do seu
              município
            </p>
          </div>
        )}
        {filteredStrategies && filteredStrategies.length > 0 && (
          <div
            onClick={() => setIsStrategiesOpen(!isStrategiesOpen)}
            className="flex cursor-pointer items-center gap-4 place-self-center rounded-xl p-2 transition-all duration-300 hover:bg-gray-200"
          >
            <p className="text-xl font-medium underline">
              {isStrategiesOpen
                ? "Ver menos"
                : "Ver todas estratégias e ações "}
            </p>
            <ChevronRight />
          </div>
        )}
      </div>
      <AddStrategyModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        goalId={goal.id}
      />
      <EditGoalModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        goal={goal}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        loading={deleteLoading}
        actionLabel="Excluir"
        title="Excluir meta"
        content="Você tem certeza que deseja excluir essa meta? Essa ação não pode ser desfeita."
        action={() => {
          setDeleteLoading(true);
          deleteMutation.mutateAsync(goal.id);
        }}
      />
    </div>
  );
}
