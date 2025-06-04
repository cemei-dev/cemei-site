import { useState } from "react";

import { CalendarDays, Check, ChevronLeft, RefreshCcw, X } from "lucide-react";

import { ActionEntity } from "@/common/entities/action";
import Button from "@/components/atoms/Button/button";
import { useActionResults } from "@/hooks/queries/useActionResults";
import { timestampToDate } from "@/utils/timestampToDate";

import SecondaryResultCard from "../SecondaryResultCard/secondaryResultCard";

export default function PublicActionParticle({
  action
}: {
  action: ActionEntity;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isNotStarted = action.status === "not_started";
  const isInProgress = action.status === "incomplete";
  const isCompleted = action.status === "completed";

  const { data: results } = useActionResults(action.id);

  return (
    <div
      className="flex w-full flex-col gap-8 rounded-3xl border border-purple-200 p-2 py-6 lg:px-10"
      key={action.id}
    >
      <div className="flex flex-col gap-4">
        {isOpen && (
          <div
            className="mt-4 hidden h-max w-max cursor-pointer rounded p-2 transition-all duration-300 hover:bg-gray-100 lg:block"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronLeft />
          </div>
        )}
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between rounded-3xl p-4">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <p className="text-xl font-light">{action.title}</p>
                <p className="line-clamp-1 text-lg font-light">{action.obs}</p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-y-4 lg:flex-row lg:justify-between lg:gap-y-0">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-4">
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
                  Prazo:{" "}
                  {timestampToDate(action.date).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
            {results && results.length > 0 && !isOpen && (
              <Button
                className="hidden h-10 w-max text-sm lg:block lg:text-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                Mais detalhes
              </Button>
            )}
            <Button
              className="h-10 w-max text-sm lg:hidden lg:text-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "Fechar" : "Mais detalhes"}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col items-center justify-center gap-4">
          <h4 className="place-self-start font-corisande text-lg lg:ml-16">
            Veja em detalhes o trabalho que estamos fazendo!
          </h4>
          <div className="flex w-full flex-col gap-8">
            {results?.map((result) => (
              <SecondaryResultCard key={result.id} result={result} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
