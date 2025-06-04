import {
  CalendarDays,
  Check,
  CircleDollarSign,
  RefreshCcw,
  X
} from "lucide-react";

import { StrategyEntity } from "@/common/entities/strategy";
import AxisProgressBar from "@/components/atoms/ProgressBar/progressBar";
import { useStrategyActions } from "@/hooks/queries/useStrategyActions";
import { timestampToDate } from "@/utils/timestampToDate";

import PublicActionSection from "../PublicActionSection/publicActionSection";

export default function PublicStrategyCard({
  strategy,
  index
}: {
  strategy: StrategyEntity;
  index: number;
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

  return (
    <div className="flex w-full flex-col gap-8 rounded-3xl border border-[#BEA7DA] bg-[#FCFDFE] px-4 lg:p-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-[56px]">{index}</h2>
          <div className="mt-6 flex flex-col gap-2">
            <p className="text-2xl">{strategy.title}</p>
            <p className="line-clamp-1 text-lg font-light">{strategy.obs}</p>
          </div>
        </div>
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
          <div className="flex w-full flex-col items-center gap-4 lg:flex-row">
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
        </div>
        <PublicActionSection actions={actions ?? []} />
        <div className="flex items-center gap-4 place-self-end">
          <p className="mb-4 lg:mb-0 lg:text-end lg:text-xl">
            Essa estratégia {!needsMoney && "não"} precisa de dinheiro da
            prefeitura.
          </p>
          {needsMoney && <CircleDollarSign strokeWidth={2} />}
        </div>
      </div>
    </div>
  );
}
