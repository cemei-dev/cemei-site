import { DollarSign } from "lucide-react";
import Image from "next/image";

import { ResultEntity } from "@/common/entities/result";
import useAction from "@/hooks/queries/useAction";

export default function PublicResultCard({ result }: { result: ResultEntity }) {
  const { data: action } = useAction(result.actionId);
  return (
    <div className="flex w-full flex-col rounded-[32px] border">
      <div className="relative h-64 w-full">
        <Image
          src={result.imageUrl}
          alt={result.result}
          fill
          className="rounded-[24px] object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-10 p-10">
        <h2 className="text-2xl font-bold">{result.result}</h2>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold">Objetivo dessa ação</p>
            <p className="text-sm font-semibold">{action?.title}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="w-max text-xl font-light">
              Essa ação {!action?.needMoney && "não"} precisa de dinheiro da
              prefeitura.
            </p>
            {action?.needMoney ? (
              <DollarSign className="h-6 w-6" />
            ) : (
              <div className="relative h-6 w-6">
                <Image
                  src="/images/dollar.svg"
                  alt="money"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
