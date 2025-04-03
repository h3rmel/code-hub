import { Info, Minus, Plus } from 'lucide-react';
import CurrencyInput from 'react-currency-input-field';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type AmountInputProps = {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function AmountInput({
  value,
  onChange,
  placeholder,
  disabled,
}: AmountInputProps) {
  const parsedValue = parseFloat(value);

  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  function onReverseValue() {
    if (!value) return;

    const newValue = parseFloat(value) * -1;

    onChange(newValue.toString());
  }

  return (
    <>
      <div className={cn('relative', 'flex items-center gap-2')}>
        <CurrencyInput
          prefix="$"
          placeholder={placeholder}
          value={value}
          decimalsLimit={2}
          decimalScale={2}
          onValueChange={onChange}
          disabled={disabled}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              type="button"
              variant="secondary"
              disabled={disabled}
              className={cn(
                'flex-grow w-10',
                isIncome && 'bg-emerald-600 hover:bg-emerald-500',
                isExpense && 'bg-rose-600 hover:bg-rose-500',
              )}
              onClick={onReverseValue}
            >
              {!parsedValue && <Info className="size-3 text-white" />}
              {isIncome && <Plus className="size-3 text-white" />}
              {isExpense && <Minus className="size-3 text-white" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Use [+] for income and [-] for expense</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <p className="text-sm text-muted-foreground">
        {isIncome && 'This will add money to your account.'}
        {isExpense && 'This will subtract money from your account.'}
      </p>
    </>
  );
}
