import Image from "next/image";

import { GoalEntity } from "@/common/entities/goal";

// ponytail: shared pelo card do painel e pelo card público, para a meta não divergir entre as duas telas
export default function GoalDetails({ goal }: { goal: GoalEntity }) {
  const subGoals = goal.subGoals?.filter(Boolean) ?? [];

  if (!goal.imageUrl && subGoals.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-8">
      {goal.imageUrl && (
        <div className="relative h-64 w-full overflow-hidden rounded-3xl">
          <Image
            src={goal.imageUrl}
            alt={goal.text}
            fill
            className="object-contain"
          />
        </div>
      )}
      {subGoals.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium text-intense-purple">Submetas</p>
          <ul className="flex list-disc flex-col gap-2 pl-6">
            {subGoals.map((subGoal, index) => (
              <li key={index} className="text-lg">
                {subGoal}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
