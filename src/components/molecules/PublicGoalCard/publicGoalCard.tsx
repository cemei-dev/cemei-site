import { useState } from "react";

import { ChevronRight } from "lucide-react";

import { GoalEntity } from "@/common/entities/goal";
import LoadingComponent from "@/components/atoms/Loading/loading";
import Select from "@/components/atoms/Select/select";
import XLProgressBar from "@/components/atoms/XLProgressBar/XLProgressBar";
import { useCityGoalStrategies } from "@/hooks/queries/useAllCityGoalStrategies";
import { useCityActions } from "@/hooks/queries/useCityActions";
import { useGoalResults } from "@/hooks/queries/useGoalResults";

import MoneySort from "../MoneySort/moneySort";
import { PieChartComp } from "../PieChart/pieChart";
import PublicResultCard from "../PublicResultCard/publicResultCard";
import PublicStrategyCard from "../PublicStrategyCard/publicStrategyCard";

export default function PublicGoalCard({
  goal,
  index,
  cityId,
  selectedGoal,
  setSelectedGoal
}: {
  goal: GoalEntity;
  index: number;
  cityId: string;
  selectedGoal: GoalEntity | null;
  setSelectedGoal: (goal: GoalEntity | null) => void;
}) {
  const { data: actions } = useCityActions(cityId);
  const { data: goalResults } = useGoalResults(goal.id);
  const { data: strategies } = useCityGoalStrategies(cityId, goal.id);
  const [sort, setSort] = useState<string>("completed");
  const [moneySort, setMoneySort] = useState<string>("all");
  const goalActions = actions?.filter((action) => action.goalId === goal.id);

  const strategiesWithInfo = strategies?.map((strategy) => {
    const strategyActions = goalActions?.filter(
      (action) => action.strategyId === strategy.id
    );
    const needMoney =
      strategyActions?.some((action) => action.needMoney === true) ?? false;

    const doneActions =
      strategyActions?.filter((action) => action.status === "completed")
        .length ?? 0;
    const progressActions =
      strategyActions?.filter((action) => action.status === "incomplete")
        .length ?? 0;
    const notStartedActions =
      strategyActions?.filter((action) => action.status === "not_started")
        .length ?? 0;
    const allActions = strategyActions?.length ?? 0;

    const isCompleted = allActions > 0 && allActions === doneActions;
    const isInProgress = progressActions > 0 || notStartedActions > 0;

    const strategyStatus = isCompleted
      ? "completed"
      : isInProgress
        ? "in_progress"
        : "not_started";

    return {
      ...strategy,
      needMoney,
      status: strategyStatus
    };
  });

  const filteredStrategies = strategiesWithInfo?.filter((strategy) => {
    const moneyMatch =
      moneySort === "all" ||
      (moneySort === "need" && strategy.needMoney) ||
      (moneySort === "no_need" && !strategy.needMoney);

    return moneyMatch;
  });

  const sortedStrategies = filteredStrategies?.sort((a, b) => {
    if (sort === "started") {
      return a.status === "in_progress"
        ? -1
        : b.status === "in_progress"
          ? 1
          : 0;
    }
    if (sort === "completed") {
      return a.status === "completed" ? -1 : b.status === "completed" ? 1 : 0;
    }
    if (sort === "not_started") {
      return a.status === "not_started"
        ? -1
        : b.status === "not_started"
          ? 1
          : 0;
    }
    return 0;
  });

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

  if (!sortedStrategies) return <LoadingComponent />;

  return (
    <div className="flex w-full flex-col gap-8">
      <div
        className={`flex flex-col gap-[67px] rounded-3xl ${
          selectedGoal ? "" : "border border-[#BEA7DA] bg-[#F2F2F2]"
        }  p-6 lg:p-14`}
      >
        <div className="flex flex-col gap-6">
          <h4
            className={`${
              selectedGoal
                ? "text-3xl font-normal text-intense-purple"
                : "text-2xl font-bold text-gray-black"
            }`}
          >
            Meta {index}
          </h4>

          <h4 className="text-2xl">{goal.text}</h4>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="flex w-full flex-col gap-4 rounded-3xl border border-[#E4CCDC] bg-[#FCFDFE] px-4 py-[73px] lg:px-8">
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
          {selectedGoal?.id === goal.id && (
            <div className="flex w-full flex-col gap-4 rounded-3xl border border-[#E4CCDC] bg-[#FCFDFE] p-6 lg:w-[70%]">
              <PieChartComp
                chartData={[
                  {
                    browser: `${doneActions} ações completas`,
                    visitors: doneActions ?? 0,
                    fill: "#33B1E4"
                  },
                  {
                    browser: `${incompletedActions} ações em andamento`,
                    visitors: incompletedActions ?? 0,
                    fill: "#FDC139"
                  },
                  {
                    browser: `${notStartedActions} ações não iniciadas`,
                    visitors: notStartedActions ?? 0,
                    fill: "#F455BD"
                  }
                ]}
              />
            </div>
          )}
        </div>
        {selectedGoal?.id === goal.id ? (
          <>
            <div className="flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
              <h4 className="text-[32px] font-semibold">Estratégias</h4>
              <Select
                className="w-max"
                options={[
                  {
                    label: "Estratégias iniciadas",
                    value: "started"
                  },
                  {
                    label: "Estratégias finalizadas",
                    value: "completed"
                  },
                  {
                    label: "Estratégias não iniciadas",
                    value: "not_started"
                  }
                ]}
                value={sort ?? "completed"}
                onChange={(value) => setSort(value)}
                placeholder="Ordenar por"
              />
            </div>
            <MoneySort setMoneySort={setMoneySort} moneySort={moneySort} />
            {sortedStrategies && sortedStrategies.length > 0 ? (
              <div className="flex w-full flex-col gap-10">
                {sortedStrategies.map((strategy, index) => (
                  <PublicStrategyCard
                    key={strategy.id}
                    index={index + 1}
                    strategy={strategy}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-56 w-full flex-col items-center justify-center gap-8 rounded-3xl border border-[#BEA7DA] bg-[#FCFDFE] p-2 lg:p-10">
                <p className="text-center text-lg text-[#B0B0B0]">
                  Adicione estratégia e suas respectivas ações do PME do seu
                  município
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="relative w-full">
            <div className="flex h-full w-full flex-col gap-x-14 gap-y-8 lg:flex-row lg:gap-y-0 lg:overflow-x-auto lg:overflow-y-visible">
              {goalResults?.map((actionResult) => (
                <PublicResultCard key={actionResult.id} result={actionResult} />
              ))}
            </div>
          </div>
        )}

        {strategies && strategies.length > 0 && (
          <div
            onClick={() => {
              if (selectedGoal?.id !== goal.id) {
                setSelectedGoal(goal);
              } else {
                setSelectedGoal(null);
              }
            }}
            className="flex cursor-pointer items-center gap-4 place-self-center rounded-xl p-2 transition-all duration-300 hover:bg-gray-200"
          >
            <p className="text-xl font-medium underline">
              {selectedGoal?.id === goal.id
                ? "Ver menos"
                : "Ver todas estratégias e ações"}
            </p>
            <ChevronRight />
          </div>
        )}
      </div>
    </div>
  );
}
