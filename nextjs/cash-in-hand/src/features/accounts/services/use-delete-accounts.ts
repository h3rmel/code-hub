import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.accounts.$delete>;
type RequestType = InferRequestType<typeof client.api.accounts.$delete>['json'];

export function useDeleteAccounts() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts.$delete({
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Account(s) deleted successfully');
      void queryClient.invalidateQueries({ queryKey: ['accounts'] });
      void queryClient.invalidateQueries({ queryKey: ['transactions'] });
      void queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Failed to create account(s)');
    },
  });

  return mutation;
}
