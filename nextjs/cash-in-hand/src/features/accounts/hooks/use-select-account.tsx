import { JSX, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useCreateAccount, useGetAccounts } from '../services';
import { Select } from '@/components/select';

export function useSelectAccount(): [
  () => JSX.Element,
  () => Promise<unknown>,
] {
  const accountsQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  function onCreateAccount(name: string) {
    accountMutation.mutate({ name });
  }

  const accountOptions = (accountsQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);
  const selectValue = useRef<string | undefined>(undefined);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  function handleClose() {
    setPromise(null);
  }

  function handleConfirm() {
    promise?.resolve(selectValue.current);
    handleClose();
  }

  function handleCancel() {
    promise?.resolve(undefined);
    handleClose();
  }

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Select an account to continue or create a new one.
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select an account"
          options={accountOptions}
          onChange={(value) => (selectValue.current = value)}
          onCreate={onCreateAccount}
          disabled={accountsQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
}
