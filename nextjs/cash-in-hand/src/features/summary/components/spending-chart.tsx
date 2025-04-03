'use client';

import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

import { DonutChartVariant } from './charts/donut-chart-variant';
import { RadialChartVariant } from './charts/radial-chart-variant';

type SpendingChartProps = {
  data?: {
    value: number;
    name: string;
  }[];
};

type ChartType = 'donut' | 'radial';

export function SpendingChart({ data = [] }: SpendingChartProps) {
  const [selectedChart, setSelectedChart] = useState<ChartType>('donut');

  const chartConfig = data.reduce(
    (acc, item, index) => ({
      ...acc,
      [item.name.toLowerCase()]: {
        label: item.name,
      },
    }),
    {} as ChartConfig,
  );

  function renderChart() {
    if (data.length === 0) {
      return <p>No data.</p>;
    }

    switch (selectedChart) {
      case 'donut':
        return <DonutChartVariant data={data} chartConfig={chartConfig} />;
      case 'radial':
        return <RadialChartVariant data={data} chartConfig={chartConfig} />;
      default:
        return <DonutChartVariant data={data} chartConfig={chartConfig} />;
    }
  }

  return (
    <Card>
      <CardHeader
        className={cn(
          'flex space-y-2 lg:space-y-0 flex-col lg:flex-row lg:items-center justify-between',
        )}
      >
        <CardTitle className={cn('text-2xl line-clamp-1')}>Spending</CardTitle>
        <Select
          value={selectedChart}
          onValueChange={(value) => setSelectedChart(value as ChartType)}
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select a chart" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="donut">Donut</SelectItem>
            <SelectItem value="radial">radial</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}
