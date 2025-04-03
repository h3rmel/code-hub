'use client';

import { useSearchParams } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';

import { cn, formatDateRange } from '@/lib/utils';

import { DataCard } from './data-card';

type DataGridProps = {
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

export function DataGrid({ isLoading, data }: DataGridProps) {
  const params = useSearchParams();

  const to = params.get('to') || '';
  const from = params.get('from') || '';
  const accountId = params.get('accountId') || '';

  const dateRangeLabel = formatDateRange({ from, to });

  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-2')}>
        <Skeleton className={cn('h-48 w-full')} />
        <Skeleton className={cn('h-48 w-full')} />
        <Skeleton className={cn('h-48 w-full')} />
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-2')}>
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon="piggy-bank"
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon="trending-up"
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Expenses"
        value={data?.expensesAmount}
        percentageChange={data?.expensesChange}
        icon="trending-down"
        dateRange={dateRangeLabel}
      />
    </div>
  );
}
