import { TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { useSheets } from '@/hooks/use-sheets';

type CategoryColumnProps = {
  id: string;
  categoryName: string | null;
  categoryId: string | null;
};

export function CategoryColumn({
  id,
  categoryName,
  categoryId,
}: CategoryColumnProps) {
  const { onOpen } = useSheets();

  return (
    <Button
      variant="link"
      size="icon"
      onClick={() => onOpen('editCategory', categoryId ?? id)}
      className={cn(!categoryName && 'text-rose-500')}
    >
      {!categoryName && <TriangleAlert className="size-4 shrink-0" />}
      {categoryName || 'Uncategorized'}
    </Button>
  );
}
