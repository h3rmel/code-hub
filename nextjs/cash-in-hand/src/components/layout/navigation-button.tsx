import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

type NavigationButtonProps = {
  href: string;
  label: string;
  isActive: boolean;
};

export function NavigationButton({
  href,
  label,
  isActive,
}: NavigationButtonProps) {
  return (
    <Button
      asChild
      size="sm"
      variant="ghost"
      className={cn(isActive ? 'bg-foreground/10' : 'bg-transparent')}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
