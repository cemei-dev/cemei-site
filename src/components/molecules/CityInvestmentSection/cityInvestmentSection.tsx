import { useForm } from "react-hook-form";

import { InvestmentEntity } from "@/common/entities/investment";

import CityInvestmentCard from "../CityInvestmentCard/cityInvestmentCard";
import SelectField from "../SelectField/selectField";

interface InvestmentSectionProps {
  investments: InvestmentEntity[];
}

export default function CityInvestmentSection({
  investments
}: InvestmentSectionProps) {
  const currentYearStr = new Date().getFullYear().toString();

  const investmentYearsSet = new Set(
    investments?.map((inv: InvestmentEntity) => inv.year) || []
  );

  investmentYearsSet.add(currentYearStr);
  const investmentYears = Array.from(investmentYearsSet);

  investmentYears.sort((a, b) => parseInt(a) - parseInt(b));
  const yearOptions = investmentYears.map((year) => ({
    label: year,
    value: year
  }));

  const { control: filterControl, watch: filterWatch } = useForm({
    defaultValues: {
      filterYear: currentYearStr
    }
  });

  const selectedYear = filterWatch("filterYear");
  const filteredInvestments = investments?.filter(
    (inv: InvestmentEntity) => inv.year === selectedYear
  );
  return (
    <section className="flex w-full flex-col gap-16 rounded-[40px] border-2 border-purple-400 bg-white px-14 py-16">
      <div className="flex items-center justify-between">
        <text className="text-3xl font-medium text-intense-purple">
          Descubra o quanto o município investiu em educação nos últimos tempos!
        </text>
        <SelectField
          name="filterYear"
          control={filterControl}
          options={yearOptions}
          placeholder="Ano"
        />
      </div>
      {filteredInvestments && filteredInvestments.length > 0 ? (
        <div className="flex w-full flex-col items-center gap-14 lg:flex-row lg:items-start">
          {filteredInvestments.map((invest: InvestmentEntity) => (
            <CityInvestmentCard
              amount={invest.amount}
              key={invest.id}
              id={invest.id}
              timerange={invest.timerange}
              year={invest.year}
              category={invest.category}
            />
          ))}
        </div>
      ) : (
        <text className="text-xl font-bold">Sem investimento</text>
      )}
    </section>
  );
}
