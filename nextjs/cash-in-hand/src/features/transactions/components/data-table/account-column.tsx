import { Button } from '@/components/ui/button';

import { useSheets } from '@/hooks/use-sheets';

type AccountColumnProps = {
  accountName: string;
  accountId: string;
};

export function AccountColumn({ accountName, accountId }: AccountColumnProps) {
  const { onOpen } = useSheets();

  return (
    <Button
      variant="link"
      size="icon"
      onClick={() => onOpen('editAccount', accountId)}
    >
      {accountName}
    </Button>
  );
}
