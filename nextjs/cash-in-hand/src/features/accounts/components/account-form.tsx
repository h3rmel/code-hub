import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

import { insertAccountSchema } from '@/database/schema';

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

type AccountFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: VoidFunction;
  disabled?: boolean;
};

export function AccountForm({
  onSubmit,
  defaultValues,
  disabled,
  id,
  onDelete,
}: AccountFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  function handleSubmit(values: FormValues) {
    onSubmit(values);
  }

  function handleDelete() {
    onDelete?.();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('space-y-4 pt-4')}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Cash, Back, Credit Card, etc."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className={cn('w-full')} type="submit" disabled={disabled}>
          {!disabled ? (
            <>{id ? 'Save Changes' : 'Create Account'}</>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </Button>
        {id ? (
          <Button
            className="w-full"
            variant="outline"
            type="button"
            disabled={disabled}
            onClick={handleDelete}
          >
            <Trash className="size-4" />
            Delete Account
          </Button>
        ) : null}
      </form>
    </Form>
  );
}
