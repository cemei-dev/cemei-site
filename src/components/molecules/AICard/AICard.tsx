import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/atoms/Button/button";

export default function AICard() {
  const router = useRouter();
  return (
    <div className="flex h-full w-max items-center justify-between gap-20 rounded-3xl border-2 border-[#BEA7DA] px-10 py-8">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h3 className="w-[40rem] text-3xl">
            Faça o resumo do PME com Inteligência Artificial!
          </h3>
          <p className="w-[37rem] text-xl">
            Carregue o documento PME e nossa IA faz o resto. Receba um resumo
            detalhado em segundos.
          </p>
        </div>
        <Button
          onClick={() => router.push("/home/ia")}
          className="w-max"
          suffix={
            <Image src="/images/ai.svg" alt="AI" width={24} height={24} />
          }
        >
          Experimente agora
        </Button>
      </div>
      <Image
        src="/images/ai-icon.svg"
        alt="AI"
        className="mr-8"
        width={130}
        height={130}
      />
    </div>
  );
}
