"use client";

import { useState } from "react";

import { ChevronLeft, Plus, RefreshCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Button from "@/components/atoms/Button/button";
import Select from "@/components/atoms/Select/select";
import AddGoalModal from "@/components/molecules/AddGoalModal/addGoalModal";
import GoalCard from "@/components/molecules/GoalCard/goalCard";
import { useAllAxis } from "@/hooks/queries/useAllAxis";
import { useAxisGoals } from "@/hooks/queries/useAxisGoals";
import useProfile from "@/hooks/queries/useProfile";
import useAuth from "@/hooks/useAuth";
export default function AxisPage() {
  const { axisId } = useParams();
  const router = useRouter();
  const { data: allAxis } = useAllAxis();

  const currentAxis = allAxis?.find((axis) => axis.id === axisId);
  const { data: goals, refetch: refetchGoals } = useAxisGoals(axisId as string);
  const { userUid } = useAuth();
  const { data: user } = useProfile(userUid);
  const [isRotating, setIsRotating] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  // ponytail: sort by the meta's own number so municípios aren't locked into 1,2,3 creation order; goals without a number fall to the end
  const sortedGoals = goals
    ? [...goals].sort((a, b) => (a.number ?? Infinity) - (b.number ?? Infinity))
    : [];

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-20 pt-14">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <div
            onClick={() => router.back()}
            className="flex cursor-pointer items-center justify-center rounded-2xl p-2 transition-all duration-300 hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </div>
          <h1 className="text-[32px] font-semibold">
            Plano {currentAxis?.name}
          </h1>
          <Button
            onClick={() => {
              setIsRotating(true);
              setTimeout(() => setIsRotating(false), 1000);
              refetchGoals();
            }}
            className="ml-2 w-max rounded-full p-3"
          >
            <RefreshCcw
              className={`h-6 w-6 transition-transform duration-1000 ${isRotating ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Select
            className="h-max w-max"
            options={
              allAxis?.map((axis) => ({
                label: axis.name,
                value: axis.id,
              })) ?? []
            }
            value={currentAxis?.id || ""}
            onChange={(value) => {
              router.push(`/home/${value}`);
            }}
          />
          <Button onClick={() => setIsAddGoalOpen(true)} suffix={<Plus />}>
            Adicionar nova meta
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-8">
        {sortedGoals.length > 0 ? (
          sortedGoals.map((goal, index) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              index={index + 1}
              cityId={user?.cityId as string}
            />
          ))
        ) : (
          <div className="flex h-56 w-full flex-col items-center justify-center gap-8 rounded-3xl border border-[#BEA7DA] bg-[#FCFDFE] p-10">
            <p className="text-center text-3xl text-[#B0B0B0]">
              Adicione metas para o eixo {currentAxis?.name} e as visualize aqui
            </p>
          </div>
        )}
      </div>
      <AddGoalModal
        isOpen={isAddGoalOpen}
        setIsOpen={setIsAddGoalOpen}
        axisId={axisId as string}
      />
    </div>
  );
}
