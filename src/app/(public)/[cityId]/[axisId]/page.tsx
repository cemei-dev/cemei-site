"use client";

import { useState } from "react";

import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { GoalEntity } from "@/common/entities/goal";
import LoadingComponent from "@/components/atoms/Loading/loading";
import Select from "@/components/atoms/Select/select";
import PublicGoalCard from "@/components/molecules/PublicGoalCard/publicGoalCard";
import { useAllAxis } from "@/hooks/queries/useAllAxis";
import useAxis from "@/hooks/queries/useAxis";
import { useAxisGoals } from "@/hooks/queries/useAxisGoals";
import useGetCityById from "@/hooks/queries/useGetCityBtId";
export default function AxisPage() {
  const { cityId, axisId } = useParams();
  const router = useRouter();
  const { data: axis } = useAxis(axisId as string);
  const { data: city } = useGetCityById(cityId as string);
  const { data: allAxis } = useAllAxis();
  const { data: goals } = useAxisGoals(axisId as string);

  const [selectedGoal, setSelectedGoal] = useState<GoalEntity | null>(null);

  const axisOptions = allAxis?.map((axis) => ({
    label: axis.name,
    value: axis.id
  }));

  return (
    <main className="relative z-10 flex flex-col justify-start gap-20 px-[2%] pt-14 md:px-[4%]">
      <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
        <div className="mr-16 flex items-center gap-4 md:mr-0">
          <div
            onClick={() => router.push(`/${cityId}`)}
            className="flex cursor-pointer items-center justify-center rounded-2xl p-2 transition-all duration-300 hover:bg-gray-100"
          >
            <ChevronLeft className="h-10 w-10" />
          </div>
          {axis ? (
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <h1 className="text-[32px] font-semibold">
                Panorama {city?.name}
              </h1>
            </div>
          ) : (
            <LoadingComponent />
          )}
        </div>
        <Select
          options={axisOptions ?? []}
          value={axisId as string}
          onChange={(value) => router.push(`/${cityId}/${value}`)}
          className="h-max w-max"
        />
      </div>
      {selectedGoal ? (
        <PublicGoalCard
          goal={selectedGoal}
          index={1}
          cityId={cityId as string}
          selectedGoal={selectedGoal}
          setSelectedGoal={setSelectedGoal}
        />
      ) : goals && goals.length > 0 ? (
        <div className="flex w-full flex-col gap-8">
          {goals?.map((goal, index) => (
            <PublicGoalCard
              key={goal.id}
              goal={goal}
              index={index + 1}
              cityId={cityId as string}
              selectedGoal={selectedGoal}
              setSelectedGoal={setSelectedGoal}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-56 w-full flex-col items-center justify-center gap-8 rounded-3xl border border-[#BEA7DA] bg-[#FCFDFE] p-10">
          <p className="text-center text-3xl text-[#B0B0B0]">
            Nenhuma meta encontrada para o eixo {axis?.name}
          </p>
        </div>
      )}
    </main>
  );
}
