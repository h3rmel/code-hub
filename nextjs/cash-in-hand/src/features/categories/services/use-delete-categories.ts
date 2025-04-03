import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.categories.$delete>;
type RequestType = InferRequestType<
  typeof client.api.categories.$delete
>['json'];

export function useDeleteCategories() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories.$delete({
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Category(ies) deleted successfully');
      void queryClient.invalidateQueries({ queryKey: ['categories'] });
      void queryClient.invalidateQueries({ queryKey: ['transactions'] });
      void queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Failed to create category(ies)');
    },
  });

  return mutation;
}
