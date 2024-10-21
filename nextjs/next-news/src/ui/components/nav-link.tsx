'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLink({ children, href }: { href: string; children: string }) {
  const path = usePathname();

  return (
    <Link href={href} className={path.startsWith(href) ? 'active' : undefined}>
      {children}
    </Link>
  );
}
