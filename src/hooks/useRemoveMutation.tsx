import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [queryKey] });
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
