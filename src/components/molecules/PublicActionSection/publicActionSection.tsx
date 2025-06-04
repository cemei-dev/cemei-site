import { ActionEntity } from "@/common/entities/action";

import PublicActionParticle from "../PublicActionParticle/PublicActionParticle";

export default function PublicActionSection({
  actions
}: {
  actions: ActionEntity[];
}) {
  return (
    <div className="flex flex-col gap-4 p-0 lg:p-8">
      <div className="flex items-center justify-between">
        <h4 className="text-xl">Ações</h4>
      </div>
      <div className="flex flex-col gap-10">
        {actions.map((action) => (
          <PublicActionParticle key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
}
