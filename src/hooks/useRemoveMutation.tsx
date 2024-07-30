import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface useRmoveMutationProps {
  apiFunction: (id: string) => Promise<any>;
  queryKey: string | string[];
}

export const useRmoveMutation = ({
  apiFunction,
  queryKey,
}: useRmoveMutationProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => apiFunction(id),
    onSuccess: (data) => {
      // queryClient.refetchQueries({ queryKey: [queryKey] });
      queryClient.setQueryData([queryKey], (oldQuerydata: any) => {
        return {
          ...oldQuerydata,
          data: [...oldQuerydata, data.data],
        };
      });
      toast.success('Successfully Deleted');
    },
  });

  const handleMutation = (id: string) => {
    mutation.mutate(id);
  };

  return {
    handleMutation,

    isLoading: mutation.isPending,
  };
};
