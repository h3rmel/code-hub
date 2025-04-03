'use client';

import { Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

import { columns } from '@/features/accounts/components';
import {
  useDeleteAccounts,
  useGetAccounts,
} from '@/features/accounts/services';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

import { useSheets } from '@/hooks/use-sheets';

export default function AccountsPage() {
  const { onOpen } = useSheets();

  const accountsQuery = useGetAccounts();
  const deleteAccounts = useDeleteAccounts();

  const accounts = accountsQuery.data ?? [];
  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  function handleOnDelete(
    rows: Row<{
      id: string;
      name: string;
    }>[],
  ) {
    const ids = rows.map((r) => r.original.id);

    deleteAccounts.mutate({ ids });
  }

  if (accountsQuery.isLoading) {
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
          Accounts Page
        </h2>
        <Button
          size="sm"
          className="w-full lg:w-auto"
          onClick={() => onOpen('newAccount')}
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
