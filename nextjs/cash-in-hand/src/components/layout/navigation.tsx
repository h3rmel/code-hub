'use client';

import { useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';

import useMedia from '@/hooks/use-media';

import { NavigationButton } from './navigation-button';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

type NavigationRoutes = {
  href: string;
  label: string;
};

const routes: NavigationRoutes[] = [
  {
    href: '/',
    label: 'Overview',
  },
  {
    href: '/transactions',
    label: 'Transactions',
  },
  {
    href: '/accounts',
    label: 'Accounts',
  },
  {
    href: '/categories',
    label: 'Categories',
  },
  // {
  //   href: '/settings',
  //   label: 'Settings',
  // },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const isMobile = useMedia('(max-width: 1024px)', false);

  function onClick(href: string) {
    router.push(href);

    setIsOpen(false);
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="bg-background/10">
            <Menu className={cn('size-4')} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className={cn('px-2')}>
          <div className="hidden" aria-hidden="true">
            <SheetTitle>Dashboard Sheet</SheetTitle>
            <SheetDescription>
              Dashboard Sheet with navigation options.
            </SheetDescription>
          </div>
          <nav className={cn('flex flex-col gap-2', 'pt-6')}>
            {routes.map((route) => (
              <Button
                key={route.label}
                variant={route.href === pathname ? 'secondary' : 'ghost'}
                onClick={() => onClick(route.href)}
                className={cn('w-full justify-start')}
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav
      className={cn('hidden lg:flex', 'items-center gap-2', 'overflow-x-auto')}
    >
      {routes.map((route) => (
        <NavigationButton
          key={route.label}
          {...route}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
}
