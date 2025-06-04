import Image from "next/image";

import { ActionEntity } from "@/common/entities/action";
import { EducationalAxisEntity } from "@/common/entities/educationalAxis";
import AxisProgressBar from "@/components/atoms/ProgressBar/progressBar";

export default function AxisCard({
  axis,
  onClick,
  isSelected,
  actions
}: {
  axis: EducationalAxisEntity;
  onClick?: () => void;
  isSelected?: boolean;
  actions?: ActionEntity[];
}) {
  const axisActions = actions?.filter(
    (action) => action.educationalAxisId === axis.id
  );

  const progress = axisActions?.filter(
    (action) => action.status === "completed"
  ).length;

  const total = axisActions?.length || 0;

  return (
    <div
      onClick={onClick}
      className={`rounded-purple-200 flex h-full w-full flex-col items-center justify-center gap-2 rounded-[32px] border-2 px-9 py-8
 ${isSelected ? "border-3 border-intense-purple bg-purple-100" : "transform cursor-pointer border-purple-200 transition-all duration-300 hover:bg-gray-100"}`}
    >
      <div className={`relative h-16 w-16`}>
        <Image
          src={axis?.imageUrl}
          alt={axis?.name}
          fill
          className="object-contain"
        />
      </div>
      <p
        className={`w-48 text-center text-xl ${
          isSelected ? "text-intense-purple" : ""
        }`}
      >
        {axis?.name}
      </p>
      <AxisProgressBar
        className="h-8"
        progress={progress || 0}
        total={total || 0}
      />
    </div>
  );
}
