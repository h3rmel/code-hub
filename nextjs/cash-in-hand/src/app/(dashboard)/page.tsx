'use client';

import { DataCharts, DataGrid } from '@/features/summary/components';
import { useGetSummary } from '@/features/summary/services/use-get-summary';

import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { data, isLoading } = useGetSummary();

  console.log(data);

  return (
    <section className={cn('flex flex-col gap-4', 'min-h-[88dvh]', 'pb-8')}>
      <DataGrid isLoading={isLoading} data={data} />
      <DataCharts isLoading={isLoading} data={data} />
    </section>
  );
}
