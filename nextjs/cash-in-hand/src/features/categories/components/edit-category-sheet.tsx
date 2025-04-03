import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { insertCategorySchema } from '@/database/schema';
import {
  useDeleteCategories,
  useEditCategory,
  useGetCategory,
} from '@/features/categories/services';
import { useConfirm } from '@/hooks/use-confirm';
import { useSheets } from '@/hooks/use-sheets';

import { CategoryForm } from './category-form';

const formSchema = insertCategorySchema.pick({
  name: true,
  description: true,
});

type FormValues = z.input<typeof formSchema>;

export function EditCategorySheet() {
  const { isOpen, onOpen, onClose, getId } = useSheets();

  const [ConfirmDialog, confirm] = useConfirm({
    title: 'Are you sure?',
    message: 'You are about to delete this category.',
  });

  const categoryQuery = useGetCategory(getId('editCategory'));
  const mutation = useEditCategory(getId('editCategory'));
  const deleteMutation = useDeleteCategories();

  function onSubmit(values: FormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose('editCategory');
      },
    });
  }

  async function onDelete() {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(
        { ids: [getId('editCategory')] },
        {
          onSuccess: () => {
            onClose('editCategory');
          },
        },
      );
    }
  }

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
        description: categoryQuery.data.description,
      }
    : { name: '', description: '' };

  return (
    <Sheet
      open={isOpen('editCategory')}
      onOpenChange={() => onOpen('editCategory')}
    >
      <ConfirmDialog />
      <SheetContent onClickOverlay={() => onClose('editCategory')}>
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>
            Update an category to track your finances.
          </SheetDescription>
        </SheetHeader>
        {!categoryQuery.isLoading ? (
          <CategoryForm
            id={getId('editCategory')}
            onSubmit={onSubmit}
            onDelete={onDelete}
            disabled={mutation.isPending}
            defaultValues={defaultValues}
          />
        ) : (
          <Loader2 className="size-4 mx-auto my-4 animate-spin text-muted-foreground" />
        )}
      </SheetContent>
    </Sheet>
  );
}
