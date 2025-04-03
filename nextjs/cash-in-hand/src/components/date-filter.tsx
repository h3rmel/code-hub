'use client';

import { useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { PopoverClose } from '@radix-ui/react-popover';
import { format, subDays } from 'date-fns';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import qs from 'query-string';
import { DateRange } from 'react-day-picker';

import { cn, formatDateRange } from '@/lib/utils';

import { getDateRange } from '@/utils/get-date-range';

import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export function DateFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const accountId = params.get('accountId') ?? 'all';

  const from = params.get('from') ?? '';
  const to = params.get('to') ?? '';

  const today = new Date();
  const { startDate, endDate } = getDateRange(from, to);

  const [date, setDate] = useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  });

  function pushToUrl(newDate: DateRange | undefined) {
    const query = {
      from: format(newDate?.from || subDays(today, 30), 'yyyy-MM-dd'),
      to: format(newDate?.to || today, 'yyyy-MM-dd'),
    };

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

  function onReset() {
    setDate(undefined);
    pushToUrl(undefined);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          <span>{formatDateRange({ from, to })}</span>
          <ChevronDown className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full lg:w-auto p-0" align="start">
        <Calendar
          disabled={false}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className={cn('w-full', 'flex items-center gap-2', 'p-4')}>
          <PopoverClose asChild>
            <Button
              variant="outline"
              disabled={!date?.from || !date?.to}
              className="w-full"
              onClick={onReset}
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              variant="default"
              disabled={!date?.from || !date?.to}
              className="w-full"
              onClick={() => pushToUrl(date)}
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
