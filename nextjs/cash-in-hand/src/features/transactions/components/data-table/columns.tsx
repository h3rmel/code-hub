'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { InferResponseType } from 'hono';
import { ArrowUpDown } from 'lucide-react';

import { Actions } from '@/components/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { client } from '@/lib/hono';
import { cn, formatCurrency } from '@/lib/utils';

import { AccountColumn } from './account-column';
import { CategoryColumn } from './category-column';

// import { AccountActions } from '../account-actions';

export type ResponseType = InferResponseType<
  typeof client.api.transactions.$get,
  200
>['data'][0];

export const columns: ColumnDef<ResponseType>[] = [
  // Selector
  {
    id: 'selector',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(Boolean(value))
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Amount
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Amount
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));

      return (
        <Badge
          variant={amount > 0 ? 'income' : 'expense'}
          className={cn('rounded-xl')}
        >
          {formatCurrency(amount)}
        </Badge>
      );
    },
  },
  // Account
  {
    accessorKey: 'account',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Account
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <AccountColumn
          accountId={row.original.accountId}
          accountName={row.original.account}
        />
      );
    },
  },
  // Category
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Category
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <CategoryColumn
          id={row.original.id}
          categoryId={row.original.categoryId}
          categoryName={row.original.category}
        />
      );
    },
  },
  // Payee
  {
    accessorKey: 'payee',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Payee
        <ArrowUpDown className="size-4" />
      </Button>
    ),
  },
  // date
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue('date') as Date;

      return <span>{format(date, 'dd MMMM, yyyy')}</span>;
    },
  },
  // Actions
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className={cn('w-full', 'flex justify-end')}>
        <Actions id={row.original.id} sheetId="editTransaction" />
      </div>
    ),
  },
];
