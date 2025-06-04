import { Pencil } from "lucide-react";
import Image from "next/image";

import Button from "@/components/atoms/Button/button";

interface PanelCardProps {
  imageUrl: string;
  cityName: string;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
}

export default function PanelCard({
  imageUrl,
  cityName,
  setIsEdit
}: PanelCardProps) {
  return (
    <div className="flex h-full w-max flex-col items-center justify-center gap-6 rounded-3xl border-2 border-[#BEA7DA] px-8 py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative h-[105px] w-[105px]">
          <Image src={imageUrl} alt={cityName} fill />
        </div>
        <p className="text-xl">{cityName}</p>
      </div>
      <Button
        onClick={() => setIsEdit(true)}
        className="w-max px-12"
        size="md"
        suffix={<Pencil />}
      >
        Editar perfil
      </Button>
    </div>
  );
}
