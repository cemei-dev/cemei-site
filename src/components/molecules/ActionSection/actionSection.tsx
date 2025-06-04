import { useState } from "react";

import { Plus } from "lucide-react";

import { ActionEntity } from "@/common/entities/action";
import Button from "@/components/atoms/Button/button";

import ActionParticle from "../ActionParticle/actionParticle";
import AddActionModal from "../addActionModal/addActionModal";

export default function ActionSection({
  actions,
  goalId,
  strategyId,
  axisId,
  cityId
}: {
  actions: ActionEntity[];
  goalId: string;
  strategyId: string;
  axisId: string;
  cityId: string;
}) {
  const [isAddActionModalOpen, setIsAddActionModalOpen] = useState(false);
  return (
    <div className="flex flex-col gap-14 rounded-3xl border border-[#BEA7DA] bg-[#F2F2F2] p-8">
      <div className="flex items-center justify-between">
        <h4 className="text-[32px] font-semibold">Ações</h4>
        <Button onClick={() => setIsAddActionModalOpen(true)} suffix={<Plus />}>
          Adicionar ações
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        {actions.map((action, index) => (
          <ActionParticle key={action.id} action={action} index={index + 1} />
        ))}
      </div>
      <AddActionModal
        isOpen={isAddActionModalOpen}
        setIsOpen={setIsAddActionModalOpen}
        goalId={goalId}
        strategyId={strategyId}
        axisId={axisId}
        cityId={cityId}
      />
    </div>
  );
}
