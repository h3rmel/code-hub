'use client';

import {
  EditAccountSheet,
  NewAccountSheet,
} from '@/features/accounts/components';
import {
  EditCategorySheet,
  NewCategorySheet,
} from '@/features/categories/components';
import {
  EditTransactionSheet,
  NewTransactionSheet,
} from '@/features/transactions/components';

export function SheetProvider() {
  return (
    <>
      {/* Account */}
      <EditAccountSheet />
      <NewAccountSheet />

      {/* Category */}
      <EditCategorySheet />
      <NewCategorySheet />

      {/* Transaction */}
      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  );
}
