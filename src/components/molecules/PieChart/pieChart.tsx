"use client";

import { Pie, PieChart } from "recharts";

import { CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

type ChartDataType = {
  browser: string;
  visitors: number;
  fill: string;
};

const chartConfig = {
  visitors: {
    label: "Visitors"
  },
  completed: {
    label: "Completas",
    color: "hsl(var(--chart-1))"
  },
  incomplete: {
    label: "Incompletas",
    color: "hsl(var(--chart-2))"
  },
  pending: {
    label: "Não iniciadas",
    color: "hsl(var(--chart-3))"
  }
} satisfies ChartConfig;

export function PieChartComp({ chartData }: { chartData: ChartDataType[] }) {
  if (
    !chartData ||
    chartData.map((item) => item.visitors).every((v) => v === 0)
  ) {
    return (
      <div className="flex h-[252px] w-full flex-col items-center justify-center">
        <p className="text-center text-xl text-[#B0B0B0]">
          Você ainda não possui ações para essa estratégia
        </p>
      </div>
    );
  }

  return (
    <CardContent className="flex flex-col items-center justify-center space-x-4 p-0 lg:flex-row">
      {/* Chart Container */}
      <ChartContainer
        config={chartConfig}
        className="flex aspect-square min-h-[250px] min-w-[250px]"
      >
        <PieChart width={250} height={250}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            outerRadius={80}
          />
        </PieChart>
      </ChartContainer>

      {/* Legend on the right */}
      <div className="flex flex-col space-y-2">
        {chartData.map((item) => (
          <div key={item.browser} className="flex items-center space-x-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-xl font-medium">{item.browser}</span>
          </div>
        ))}
      </div>
    </CardContent>
  );
}
