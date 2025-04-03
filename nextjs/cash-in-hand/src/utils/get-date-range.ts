import { parse, subDays } from 'date-fns';

export function getDateRange(from: string | undefined, to: string | undefined) {
  const today = new Date();

  const defaultTo = today;
  const defaultFrom = subDays(today, 30);

  const startDate = from ? parse(from, 'yyyy-MM-dd', new Date()) : defaultFrom;
  const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultTo;

  return { startDate, endDate };
}
