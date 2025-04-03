'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import qs from 'query-string';

import { useGetAccounts } from '@/features/accounts/services';
import { useGetSummary } from '@/features/summary/services/use-get-summary';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function AccountFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const accountId = params.get('accountId') ?? 'all';

  const from = params.get('from') ?? '';
  const to = params.get('to') ?? '';

  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const { isLoading: isLoadingSummary } = useGetSummary();

  function onChange(newValue: string) {
    const query = {
      accountId: newValue,
      from,
      to,
    };

    if (newValue === 'all') {
      query.accountId = '';
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );

    router.push(url);
  }

  return (
    <Select
      disabled={isLoadingAccounts || isLoadingSummary}
      onValueChange={onChange}
      value={accountId}
    >
      <SelectTrigger className='"w-full lg:w-auto'>
        <SelectValue placeholder="Select an account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Accounts</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
