import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.transactions.$delete>;
type RequestType = InferRequestType<
  typeof client.api.transactions.$delete
>['json'];

export function useDeleteTransactions() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions.$delete({
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Transaction(s) deleted successfully');
      void queryClient.invalidateQueries({ queryKey: ['transactions'] });
      void queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Failed to create transaction(s)');
    },
  });

  return mutation;
}
