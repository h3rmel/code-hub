/* eslint-disable @typescript-eslint/no-unused-vars */

import { z } from 'zod';

import { CategoryForm } from '@/features/categories/components';
import { useCreateCategory } from '@/features/categories/services';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { insertCategorySchema } from '@/database/schema';
import { useSheets } from '@/hooks/use-sheets';

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export function NewCategorySheet() {
  const { isOpen, onOpen, onClose } = useSheets();
  const mutation = useCreateCategory();

  function onSubmit(values: FormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose('newCategory');
      },
    });
  }

  return (
    <Sheet
      open={isOpen('newCategory')}
      onOpenChange={() => onOpen('newCategory')}
    >
      <SheetContent onClickOverlay={() => onClose('newCategory')}>
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to track your finances.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: '' }}
        />
      </SheetContent>
    </Sheet>
  );
}
