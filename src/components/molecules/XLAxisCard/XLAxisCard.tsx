import Image from "next/image";

import LoadingComponent from "@/components/atoms/Loading/loading";
import useAxis from "@/hooks/queries/useAxis";

export default function XLAxisCard({
  axisId,
  onClick,
  isSelected
}: {
  axisId: string;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  const { data: axis } = useAxis(axisId);

  if (!axis)
    return (
      <div className="flex items-center justify-center p-10">
        <LoadingComponent />
      </div>
    );
  return (
    <div
      onClick={onClick}
      className="relative flex h-[22vh] cursor-pointer flex-col items-center justify-center gap-4 rounded-[32px]
          border-2 border-purple-200 px-14 py-8 transition-all duration-300 hover:bg-purple-100
      md:w-max"
    >
      <div className="relative h-20 w-20">
        <Image
          src={axis?.imageUrl || ""}
          alt={axis?.name || ""}
          fill
          className="object-contain"
        />
      </div>
      <p
        className={`w-48 text-center text-2xl ${
          isSelected ? "text-intense-purple" : ""
        }`}
      >
        {axis?.name}
      </p>
    </div>
  );
}
