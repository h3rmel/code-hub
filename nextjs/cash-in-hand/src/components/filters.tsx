import { cn } from '@/lib/utils';

import { AccountFilter } from './account-filter';
import { DateFilter } from './date-filter';
import { Skeleton } from './ui/skeleton';

export function Filters() {
  return (
    <div className={cn('flex flex-col lg:flex-row items-center gap-2', 'pb-4')}>
      <AccountFilter />
      <DateFilter />
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className={cn('flex flex-col lg:flex-row items-center gap-2', 'pb-4')}>
      <Skeleton className="w-full lg:w-auto" />
    </div>
  );
}
