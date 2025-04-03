'use client';

import { cn } from '@/lib/utils';

import { ChartCard } from './chart-card';
import { SpendingChart } from './spending-chart';
import { Skeleton } from '@/components/ui/skeleton';

type DataChartsProps = {
  isLoading: boolean;
  data?: {
    incomeAmount: number;
    expensesAmount: number;
    remainingAmount: number;
    categories: {
      value: number;
      name: string;
    }[];
    days: {
      income: number;
      expenses: number;
      date: string;
    }[];
    remainingChange: number;
    incomeChange: number;
    expensesChange: number;
  };
};

export function DataCharts({ data, isLoading }: DataChartsProps) {
  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-1 lg:grid-cols-6 gap-8')}>
        <div className={cn('col-span-1 lg:col-span-3 xl:col-span-4')}>
          <Skeleton className={cn('h-96 w-full')} />
        </div>
        <div className={cn('col-span-1 lg:col-span-3 xl:col-span-2')}>
          <Skeleton className={cn('h-96 w-full')} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-6 gap-8')}>
      <div className={cn('col-span-1 lg:col-span-3 xl:col-span-4')}>
        <ChartCard data={data?.days} />
      </div>
      <div className={cn('col-span-1 lg:col-span-3 xl:col-span-2')}>
        <SpendingChart data={data?.categories}/>
      </div>
    </div>
  );
}
