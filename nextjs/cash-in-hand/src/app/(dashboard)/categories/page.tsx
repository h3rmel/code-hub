'use client';

import { Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

import { columns } from '@/features/categories/components';
import {
  useDeleteCategories,
  useGetCategories,
} from '@/features/categories/services';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

import { useSheets } from '@/hooks/use-sheets';

export default function CategoriesPage() {
  const { onOpen } = useSheets();

  const categoriesQuery = useGetCategories();
  const deleteCategories = useDeleteCategories();

  const accounts = categoriesQuery.data ?? [];
  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

  function handleOnDelete(
    rows: Row<{
      id: string;
      name: string;
      description: string | null;
    }>[],
  ) {
    const ids = rows.map((r) => r.original.id);

    deleteCategories.mutate({ ids });
  }

  if (categoriesQuery.isLoading) {
    return (
      <section className={cn('flex flex-col gap-4', 'min-h-[88dvh]')}>
        <hgroup
          className={cn(
            'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2',
          )}
        >
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-24" />
        </hgroup>
        <div className="space-y-4">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-96 w-full" />
        </div>
      </section>
    );
  }

  return (
    <section className={cn('flex flex-col gap-4', 'min-h-[88dvh]')}>
      <hgroup
        className={cn(
          'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2',
        )}
      >
        <h2
          className={cn('text-2xl font-semibold tracking-tight line-clamp-1')}
        >
          Categories Page
        </h2>
        <Button
          size="sm"
          className="w-full lg:w-auto"
          onClick={() => onOpen('newCategory')}
        >
          <Plus className="size-4" />
          Add new
        </Button>
      </hgroup>
      <DataTable
        disable={isDisabled}
        onDelete={handleOnDelete}
        data={accounts}
        columns={columns}
        filterKey="name"
      />
    </section>
  );
}
