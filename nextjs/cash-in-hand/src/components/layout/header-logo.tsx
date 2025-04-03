import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export function HeaderLogo() {
  return (
    <Link href="/" className={cn('hidden lg:block')}>
      <div className={cn('flex items-center')}>
        <Image
          src={'/logo.svg'}
          alt="Cash in Hand's white logo"
          height={28}
          width={28}
        />
        <h1 className={cn('font-semibold text-2xl ml-2')}>Cash in Hand</h1>
      </div>
    </Link>
  );
}
