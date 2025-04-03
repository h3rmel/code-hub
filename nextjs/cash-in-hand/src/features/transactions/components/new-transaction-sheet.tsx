/* eslint-disable @typescript-eslint/no-unused-vars */

import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import {
  insertCategorySchema,
  insertTransactionSchema,
} from '@/database/schema';
import { useCreateAccount, useGetAccounts } from '@/features/accounts/services';
import {
  useCreateCategory,
  useGetCategories,
} from '@/features/categories/services';
import { useCreateTransaction } from '@/features/transactions/services';
import { useSheets } from '@/hooks/use-sheets';

import { TransactionForm } from './transaction-form';

const formSchema = insertTransactionSchema.omit({
  id: true,
  userId: true,
});

type FormValues = z.input<typeof formSchema>;

export function NewTransactionSheet() {
  const { isOpen, onOpen, onClose } = useSheets();

  const createMutation = useCreateTransaction();

  // #region Categories

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  function onCreateCategory(name: string) {
    categoryMutation.mutate({ name });
  }

  // #endregion

  // #region Accounts

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  function onCreateAccount(name: string) {
    accountMutation.mutate({ name });
  }

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  // #endregion

  // #region Loading States

  const isPending = createMutation.isPending;

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  // #endregion

  function onSubmit(values: FormValues) {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose('newTransaction');
      },
    });
  }

  return (
    <Sheet
      open={isOpen('newTransaction')}
      onOpenChange={() => onOpen('newTransaction')}
    >
      <SheetContent onClickOverlay={() => onClose('newTransaction')}>
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Create a new transaction to track your finances.
          </SheetDescription>
        </SheetHeader>
        {!isLoading ? (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            accountOptions={accountOptions}
            categoryOptions={categoryOptions}
            onCreateAccount={onCreateAccount}
            onCreateCategory={onCreateCategory}
            defaultValues={{
              amount: '',
              accountId: '',
              categoryId: '',
              date: new Date(),
              payee: '',
              notes: '',
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
