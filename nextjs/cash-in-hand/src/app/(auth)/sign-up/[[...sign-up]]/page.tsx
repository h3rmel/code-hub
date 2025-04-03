import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs';
import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function SignUpPage() {
  return (
    <main
      className={cn(
        'w-full min-h-[100dvh]',
        'flex items-center justify-center',
      )}
    >
      <ClerkLoaded>
        <SignUp path="/sign-up" />
      </ClerkLoaded>
      <ClerkLoading>
        <LoaderCircle
          size={128}
          className="animate-spin text-muted-foreground"
        />
      </ClerkLoading>
    </main>
  );
}
