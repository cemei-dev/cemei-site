import Image from "next/image";

import { ResultEntity } from "@/common/entities/result";

export default function SecondaryResultCard({
  result
}: {
  result: ResultEntity;
}) {
  return (
    <div className="flex w-[80%] flex-col items-center justify-start gap-10 place-self-center rounded-3xl border border-purple-200 bg-[#FCFDFE] lg:flex-row">
      <div className="relative h-40 w-full rounded-3xl lg:h-64 lg:w-[32rem]">
        <Image
          src={result.imageUrl}
          alt="Imagem do resultado"
          fill
          className="rounded-3xl object-cover"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6 text-start lg:w-[40%]">
        <h3 className="mb-10 ml-5 w-full text-start text-xl lg:mb-0 lg:ml-0">
          {result.result}
        </h3>
      </div>
    </div>
  );
}
