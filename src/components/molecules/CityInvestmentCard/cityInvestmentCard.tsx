import { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

interface CityInvestmentCardProps {
  id: string;
  timerange: string;
  year: string;
  category: string[];
  amount: string;
}

const categoryStyles: Record<string, string> = {
  "Criação de escolas": "border-intense-blue text-intense-blue",
  "Reforma em escolas": "border-intense-pink text-intense-pink",
  "Salário de professores": "border-intense-purple text-intense-purple",
  "Programas de capacitação": "border-intense-yellow text-intense-yellow"
};

export default function CityInvestmentCard({
  id,
  timerange,
  year,
  category,
  amount
}: CityInvestmentCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formattedAmount = parseFloat(amount).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      key={id}
      className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-purple-400 bg-white px-6 py-8"
    >
      <div className="flex flex-col items-center gap-4">
        <text className="text-xl font-normal text-gray-black">
          {timerange} de {year}
        </text>
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={toggleDetails}
        >
          <text className="text-sm text-gray-dark">Ver detalhes</text>
          {isOpen ? (
            <ChevronUp color="#1C1C1C" />
          ) : (
            <ChevronDown color="#1C1C1C" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col items-center gap-2">
          <text className="text-sm font-semibold text-intense-purple">
            Veja onde a prefeitura investiu
          </text>
          <div className="flex flex-col gap-2">
            {category.map((cat) => (
              <span
                key={cat}
                className={`items-center rounded-full border bg-white px-6 py-2 text-center text-sm ${
                  categoryStyles[cat] || "border-gray-300 text-gray-500"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}
      <text className="text-xl font-normal text-intense-purple">
        {formattedAmount}
      </text>
    </div>
  );
}
