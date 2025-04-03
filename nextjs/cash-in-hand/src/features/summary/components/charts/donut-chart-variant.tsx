import { Cell, Legend, Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { cn, formatPercentage } from '@/lib/utils';

type DonutChartVariantProps = {
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

export function DonutChartVariant({
  data,
  chartConfig,
}: DonutChartVariantProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-96"
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={64}
          outerRadius={96}
          paddingAngle={2}
          dataKey="value"
          labelLine={false}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
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
                      {formatPercentage(entry.payload.percent * 100)}
                    </span>
                  </li>
                ))}
              </ul>
            );
          }}
        />
      </PieChart>
    </ChartContainer>
  );
}
