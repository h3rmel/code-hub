'use client';

import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

import { AreaChatVariant } from './charts/area-chart-variant';
import { LineChartVariant } from './charts/line-chart-variant';

type ChartCardProps = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

type ChartType = 'area' | 'line';

export function ChartCard({ data = [] }: ChartCardProps) {
  const [selectedChart, setSelectedChart] = useState<ChartType>('area');

  function renderChart() {
    if (data.length === 0) {
      return <p>No data.</p>;
    }

    switch (selectedChart) {
      case 'area':
        return <AreaChatVariant data={data} />;
      case 'line':
        return <LineChartVariant data={data} />;
      default:
        return <AreaChatVariant data={data} />;
    }
  }

  return (
    <Card>
      <CardHeader
        className={cn(
          'flex space-y-2 lg:space-y-0 flex-col lg:flex-row lg:items-center justify-between',
        )}
      >
        <CardTitle className={cn('text-2xl line-clamp-1')}>
          Transactions
        </CardTitle>
        <Select
          value={selectedChart}
          onValueChange={(value) => setSelectedChart(value as ChartType)}
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select a chart" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">Area</SelectItem>
            <SelectItem value="line">Line</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}
