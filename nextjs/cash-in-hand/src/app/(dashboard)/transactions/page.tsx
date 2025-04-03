'use client';

import { useState } from 'react';

import { Row } from '@tanstack/react-table';
import { toast } from 'sonner';

import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';
import {
  columns,
  ImportSection,
  TransactionsSection,
} from '@/features/transactions/components';
import {
  useBulkCreateTransactions,
  useDeleteTransactions,
  useGetTransactions,
} from '@/features/transactions/services';

import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

import { transactions as transactionsSchema } from '@/database/schema';
import { useSheets } from '@/hooks/use-sheets';

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export default function TransactionsPage() {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState<
    typeof INITIAL_IMPORT_RESULTS
  >(INITIAL_IMPORT_RESULTS);

  const { onOpen } = useSheets();
  const [AccountDialog, confirm] = useSelectAccount();

  const transactionQuery = useGetTransactions();
  const bulkCreateTransactions = useBulkCreateTransactions();
  const deleteTransactions = useDeleteTransactions();

  const transactions = transactionQuery.data ?? [];
  const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;

  // #region Handlers

  function handleOnDelete(rows: Row<any>[]) {
    const ids = rows.map((r) => r.original.id);
    deleteTransactions.mutate({ ids });
  }

  function onUpload(results: typeof INITIAL_IMPORT_RESULTS) {
    setVariant(VARIANTS.IMPORT);
    setImportResults(results);
  }

  function onCancelImport() {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  }

  async function onSubmitImport(
    values: (typeof transactionsSchema.$inferInsert)[],
  ) {
    const accountId = await confirm();

    if (!accountId) return toast.error('Please select an account.');

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    bulkCreateTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  }

  // #endregion

  if (transactionQuery.isLoading) {
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

  function renderSections() {
    switch (variant) {
      case VARIANTS.LIST:
        return (
          <TransactionsSection
            onOpen={() => onOpen('newTransaction')}
            onUpload={onUpload}
            transactions={transactions}
            columns={columns}
            isDisabled={isDisabled}
            handleOnDelete={handleOnDelete}
          />
        );
      case VARIANTS.IMPORT:
        return (
          <>
            <AccountDialog />
            <ImportSection
              importResults={importResults}
              onCancelImport={onCancelImport}
              onSubmitImport={onSubmitImport}
            />
          </>
        );
    }
  }

  return (
    <section className={cn('flex flex-col gap-4', 'min-h-[88dvh]')}>
      {renderSections()}
    </section>
  );
}
