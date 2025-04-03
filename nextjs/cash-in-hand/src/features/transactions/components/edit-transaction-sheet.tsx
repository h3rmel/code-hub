import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import { useCreateAccount, useGetAccounts } from '@/features/accounts/services';
import {
  useCreateCategory,
  useGetCategories,
} from '@/features/categories/services';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { insertTransactionSchema } from '@/database/schema';
import { useConfirm } from '@/hooks/use-confirm';
import { useSheets } from '@/hooks/use-sheets';

import {
  useDeleteTransactions,
  useEditTransaction,
  useGetTransaction,
} from '../services';
import { TransactionForm } from './transaction-form';

const formSchema = insertTransactionSchema.omit({
  id: true,
  userId: true,
});

type FormValues = z.input<typeof formSchema>;

export function EditTransactionSheet() {
  const { isOpen, onOpen, onClose, getId } = useSheets();

  const [ConfirmDialog, confirm] = useConfirm({
    title: 'Are you sure?',
    message: 'You are about to delete this transaction.',
  });

  const transactionQuery = useGetTransaction(getId('editTransaction'));
  const editMutation = useEditTransaction(getId('editTransaction'));
  const deleteMutation = useDeleteTransactions();

  // #region Categories

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();

  function onCreateCategory(name: string) {
    categoryMutation.mutate({ name });
  }

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

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

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    transactionQuery.isPending;

  const isLoading =
    transactionQuery.isLoading ||
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  // #endregion

  // #region Handlers

  function onSubmit(values: FormValues) {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose('editTransaction');
      },
    });
  }

  async function onDelete() {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(
        { ids: [getId('editTransaction')] },
        {
          onSuccess: () => {
            onClose('editTransaction');
          },
        },
      );
    }
  }

  // #endregion

  const defaultValues = transactionQuery.data
    ? {
        amount: transactionQuery.data.amount.toString(),
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
      }
    : {
        amount: '',
        accountId: '',
        categoryId: '',
        date: new Date(),
        payee: '',
        notes: '',
      };

  return (
    <Sheet
      open={isOpen('editTransaction')}
      onOpenChange={() => onOpen('editTransaction')}
    >
      <ConfirmDialog />
      <SheetContent onClickOverlay={() => onClose('editTransaction')}>
        <SheetHeader>
          <SheetTitle>Edit Transaction</SheetTitle>
          <SheetDescription>
            Update a transaction to track your finances.
          </SheetDescription>
        </SheetHeader>
        {!transactionQuery.isLoading ? (
          <TransactionForm
            id={getId('editTransaction')}
            onSubmit={onSubmit}
            onDelete={onDelete}
            disabled={editMutation.isPending}
            defaultValues={defaultValues}
            accountOptions={accountOptions}
            categoryOptions={categoryOptions}
            onCreateAccount={onCreateAccount}
            onCreateCategory={onCreateCategory}
          />
        ) : (
          <Loader2 className="size-4 mx-auto my-4 animate-spin text-muted-foreground" />
        )}
      </SheetContent>
    </Sheet>
  );
}
