import { Legend, RadialBar, RadialBarChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { cn, formatCurrency, formatPercentage } from '@/lib/utils';

type RadialChartVariantProps = {
  data: {
    value: number;
    name: string;
  }[];
  chartConfig: ChartConfig;
};

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function RadialChartVariant({
  data,
  chartConfig,
}: RadialChartVariantProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-96"
    >
      <RadialBarChart
        cx="50%"
        cy="50%"
        barSize={10}
        innerRadius={64}
        outerRadius={128}
        data={data.map((item, index) => ({
          ...item,
          fill: COLORS[index % COLORS.length],
        }))}
        dataKey="value"
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconType="square"
          content={({ payload }) => {
            return (
              <ul className={cn('flex flex-wrap gap-2 justify-center')}>
                {payload?.map((entry: any, index: number) => (
                  <li
                    key={`item-${index}`}
                    className={cn('flex items-center gap-2')}
                  >
                    <span
                      className="size-2 rounded-[2px]"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">{entry.value}</span>
                    <span className="text-sm">
                      {formatCurrency(entry.payload.value)}
                    </span>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <RadialBar dataKey="value" background />
      </RadialBarChart>
    </ChartContainer>
  );
}
