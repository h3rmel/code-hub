import { z } from 'zod';

import { AccountForm } from '@/features/accounts/components';
import { useCreateAccount } from '@/features/accounts/services';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { insertAccountSchema } from '@/database/schema';
import { useSheets } from '@/hooks/use-sheets';

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export function NewAccountSheet() {
  const { isOpen, onOpen, onClose } = useSheets();
  const mutation = useCreateAccount();

  function onSubmit(values: FormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose('newAccount');
      },
    });
  }

  return (
    <Sheet
      open={isOpen('newAccount')}
      onOpenChange={() => onOpen('newAccount')}
    >
      <SheetContent onClickOverlay={() => onClose('newAccount')}>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your finances.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: '' }}
        />
      </SheetContent>
    </Sheet>
  );
}
