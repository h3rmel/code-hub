'use client';

import { useMemo } from 'react';

import { useTheme } from 'next-themes';

import { SingleValue } from 'react-select';
import CreateableSelect from 'react-select/creatable';

import { cn } from '@/lib/utils';

type SelectProps = {
  onChange: (value: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

export function Select({
  onChange,
  onCreate,
  options = [],
  value,
  disabled,
  placeholder,
}: SelectProps) {
  const { theme } = useTheme();

  function onSelect(option: SingleValue<{ label: string; value: string }>) {
    onChange(option?.value ?? '');
  }

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreateableSelect
      placeholder={placeholder}
      className={cn('text-xs h-9', 'bg-background text-foreground')}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: theme === 'dark' ? '#09090b' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#09090b',
          borderColor: theme === 'dark' ? '#27272a' : '#e4e4e7',
          borderRadius: '6px',
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: theme === 'dark' ? '#09090b' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#09090b',
          borderColor: theme === 'dark' ? '#27272a' : '#e4e4e7',
          borderWidth: '1px',
          borderRadius: '6px',
        }),
        option: (base) => ({
          ...base,
          backgroundColor: theme === 'dark' ? '#09090b' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#09090b',
        }),
        menuList: (base) => ({
          ...base,
          backgroundColor: theme === 'dark' ? '#09090b' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#09090b',
          borderColor: theme === 'dark' ? '#27272a' : '#e4e4e7',
          borderWidth: '1px',
          borderRadius: '6px',
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
    />
  );
}
