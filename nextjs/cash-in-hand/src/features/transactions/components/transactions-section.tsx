import { ColumnDef, Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { UploadButton } from './upload-button';

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

// TODO: Fix this any types
type TransactionsSectionProps = {
  onOpen: (key: string) => void;
  onUpload: (results: typeof INITIAL_IMPORT_RESULTS) => void;
  transactions: any[];
  columns: ColumnDef<any>[];
  isDisabled: boolean;
  handleOnDelete: (rows: Row<any>[]) => void;
};

export function TransactionsSection({
  onOpen,
  onUpload,
  transactions,
  columns,
  isDisabled,
  handleOnDelete,
}: TransactionsSectionProps) {
  return (
    <>
      <hgroup
        className={cn(
          'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2',
        )}
      >
        <h2
          className={cn('text-2xl font-semibold tracking-tight line-clamp-1')}
        >
          Transactions History{' '}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => onOpen('newTransaction')}
            className="w-full lg:w-auto"
          >
            <Plus className="size-4" />
            Add new
          </Button>
          <UploadButton onUpload={onUpload} />
        </div>
      </hgroup>
      <DataTable
        disable={isDisabled}
        onDelete={handleOnDelete}
        data={transactions}
        columns={columns}
        filterKey="payee"
      />
    </>
  );
}
