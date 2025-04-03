import { format } from 'date-fns';
import { CartesianAxis, CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--chart-2))',
  },
  expenses: {
    label: 'Expenses',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

type LineChartVariantProps = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export function LineChartVariant({ data }: LineChartVariantProps) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto w-full h-96">
      <LineChart
        data={data}
        accessibilityLayer
        margin={{ left: 12, right: 12 }}
      >
        <Line
          dataKey="income"
          type="monotone"
          stroke={chartConfig.income.color}
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="expenses"
          type="monotone"
          stroke={chartConfig.expenses.color}
          strokeWidth={2}
          dot={false}
        />
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => format(value, 'dd MMM')}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
              indicator="dot"
            />
          }
        />
      </LineChart>
    </ChartContainer>
  );
}
