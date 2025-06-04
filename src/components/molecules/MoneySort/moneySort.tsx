import { CircleDollarSign } from "lucide-react";
import Image from "next/image";

export default function MoneySort({
  moneySort,
  setMoneySort
}: {
  moneySort: string;
  setMoneySort: (moneySort: string) => void;
}) {
  return (
    <div className="flex w-full flex-col justify-around rounded-2xl border border-intense-purple lg:flex-row">
      <div
        onClick={() => setMoneySort("all")}
        className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-t-2xl border-b border-intense-purple py-2 lg:rounded-l-2xl lg:rounded-tr-none lg:border-b-0 lg:border-r ${
          moneySort === "all" && "bg-intense-purple"
        }`}
      >
        <p
          className={`${moneySort === "all" ? "text-white" : "text-intense-purple"} font-corisande`}
        >
          Todos as estratégias
        </p>
      </div>
      <div
        onClick={() => setMoneySort("need")}
        className={`flex flex-1 cursor-pointer items-center justify-center gap-2 border-b border-intense-purple py-2 lg:border-b-0 lg:border-r ${
          moneySort === "need" && "bg-intense-purple"
        }`}
      >
        <p
          className={`${moneySort === "need" ? "text-white" : "text-intense-purple"} font-corisande`}
        >
          Precisa de dinheiro da prefeitura
        </p>
        <CircleDollarSign
          size={24}
          className={`${moneySort === "need" ? "text-white" : "text-intense-purple"}`}
        />
      </div>
      <div
        onClick={() => setMoneySort("no_need")}
        className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-b-2xl py-2 lg:rounded-r-2xl lg:rounded-bl-none ${
          moneySort === "no_need" && "bg-intense-purple"
        }`}
      >
        <p
          className={`${moneySort === "no_need" ? "text-white" : "text-intense-purple"} font-corisande`}
        >
          Não precisa de dinheiro da prefeitura
        </p>
        {moneySort === "no_need" ? (
          <Image
            src="/images/white-money.svg"
            alt="dollar"
            width={20}
            height={20}
            className="h-6 w-6"
          />
        ) : (
          <Image
            src="/images/money.svg"
            alt="dollar"
            width={20}
            height={20}
            className="h-6 w-6"
          />
        )}
      </div>
    </div>
  );
}
