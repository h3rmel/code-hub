import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api.categories)[':id']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)[':id']['$patch']
>['json'];

export function useEditCategory(id?: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories[':id']['$patch']({
        param: { id },
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Category updated successfully');
      void queryClient.invalidateQueries({ queryKey: ['category', { id }] });
      void queryClient.invalidateQueries({ queryKey: ['categories'] });
      void queryClient.invalidateQueries({ queryKey: ['transactions'] });
      void queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error('Failed to edit category');
    },
  });

  return mutation;
}
