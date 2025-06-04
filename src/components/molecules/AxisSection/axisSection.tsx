import { useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAllAxis } from "@/hooks/queries/useAllAxis";

import XLAxisCard from "../XLAxisCard/XLAxisCard";

const ITEMS_PER_PAGE = 6;

export default function AxisSection({ cityId }: { cityId: string }) {
  const { data: allAxis } = useAllAxis();
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const totalPages = allAxis ? Math.ceil(allAxis.length / ITEMS_PER_PAGE) : 0;
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAxis = allAxis?.slice(startIndex, endIndex);

  const canGoNext = currentPage < totalPages - 1;
  const canGoPrev = currentPage > 0;

  return (
    <div className="mb-14 flex w-full flex-col gap-10">
      <h4 className="text-center text-2xl md:text-start md:text-3xl">
        Veja os planos municipais de educação do Município{" "}
      </h4>
      <div className="flex flex-col gap-16 place-self-center rounded-[40px] border-2 border-intense-purple px-6 py-16 md:w-[90%] md:px-14">
        <h4 className="text-center text-2xl md:text-start md:text-3xl">
          Que área da educação você quer saber mais?
        </h4>

        <div className="relative flex items-center justify-center">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={!canGoPrev}
            className={`absolute -left-8 hidden items-center justify-center rounded-full p-2 md:flex ${
              canGoPrev
                ? "text-intense-purple transition-all duration-300 hover:bg-purple-100"
                : "text-purple-200"
            }`}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="grid w-max grid-cols-1 items-center justify-center gap-x-20 gap-y-14 lg:grid-cols-2 2xl:grid-cols-3">
            {currentAxis?.map((axis) => (
              <XLAxisCard
                key={axis.id}
                axisId={axis.id}
                onClick={() => {
                  router.push(`/${cityId}/${axis.id}`);
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!canGoNext}
            className={`absolute -right-8 hidden cursor-pointer items-center justify-center rounded-full p-2 md:flex ${
              canGoNext
                ? "text-intense-purple transition-all duration-300 hover:bg-purple-100"
                : "text-purple-200"
            }`}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
