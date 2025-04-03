import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs';
import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function SignInPage() {
  return (
    <main
      className={cn(
        'w-full min-h-[100dvh]',
        'flex items-center justify-center',
      )}
    >
      <ClerkLoaded>
        <SignIn path="/sign-in" />
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
