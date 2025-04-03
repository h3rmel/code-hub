import { cva, VariantProps } from 'class-variance-authority';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';

import { CountUp } from '@/components/count-up';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { cn, formatCurrency, formatPercentage } from '@/lib/utils';

// #region Variants

const dataCardVariants = cva('rounded-lg p-3', {
  variants: {
    variant: {
      default: 'bg-blue-500/20',
      success: 'bg-emerald-500/20',
      error: 'bg-rose-500/20',
      warning: 'bg-yellow-500/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const iconVariants = cva('size-6', {
  variants: {
    variant: {
      default: 'text-blue-500 fill-blue-500/20',
      success: 'text-emerald-500 fill-emerald-500/20',
      error: 'text-rose-500 fill-rose-500/20',
      warning: 'text-yellow-500 fill-yellow-500/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type DataCardVariants = VariantProps<typeof dataCardVariants>;
type IconVariants = VariantProps<typeof iconVariants>;

// #endregion

type DataCardProps = {
  title: string;
  value?: number;
  percentageChange?: number;
  icon: IconName;
  dateRange: string;
} & DataCardVariants &
  IconVariants;

export function DataCard({
  title,
  value = 0,
  percentageChange = 0,
  icon,
  variant,
  dateRange,
}: DataCardProps) {
  return (
    <Card className={cn('w-full')}>
      <CardHeader
        className={cn('flex flex-row justify-between items-center gap-x-4')}
      >
        <hgroup className={cn('space-y-2')}>
          <CardTitle className={cn('text-2xl line-clamp-1')}>{title}</CardTitle>
          <CardDescription className={cn('line-clamp-1')}>
            {dateRange}
          </CardDescription>
        </hgroup>
        <div className={cn('shrink-0', dataCardVariants({ variant }))}>
          <DynamicIcon name={icon} className={cn(iconVariants({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h4 className={cn('text-xl font-bold line-clamp-1 break-all', 'mb-2')}>
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h4>
        <p
          className={cn(
            'text-muted-foreground text-sm line-clamp-1',
            percentageChange > 0 && 'text-emerald-500',
            percentageChange < 0 && 'text-rose-500',
          )}
        >
          {formatPercentage(percentageChange, { addPrefix: true })} from last
          period.
        </p>
      </CardContent>
    </Card>
  );
}
