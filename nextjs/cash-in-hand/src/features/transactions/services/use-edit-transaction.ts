import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[':id']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)[':id']['$patch']
>['json'];

export function useEditTransaction(id?: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions[':id']['$patch']({
        param: { id },
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Transaction updated successfully');
      void queryClient.invalidateQueries({ queryKey: ['transaction', { id }] });
      void queryClient.invalidateQueries({ queryKey: ['transactions'] });
      void queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Failed to edit transaction');
    },
  });

  return mutation;
}
