'use client';
import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { DataTable } from './data-table';
import useFetch from '@/hooks/useFetch';
import { deleteFeedback, getFeedback } from '@/api';
import { columns } from './column';
import Spinner from '@/components/common/Spinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useRmoveMutation } from '@/hooks/useRemoveMutation';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { data, isLoading, refetch } = useFetch('feedbacks', getFeedback);
  const { handleMutation } = useRmoveMutation({
    apiFunction: deleteFeedback,
    queryKey: ['feedbacks'],
  });
  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner lg />
      </div>
    );
  }
  const handleDelete = (productId: string) => {
    handleMutation(productId);
    refetch();
  };
  return (
    <div>
      <DataTable
        columns={[
          ...columns,
          {
            id: 'actions',
            cell: (info) => {
              const product = info.row.original as any;

              return (
                <Button
                  variant={'ghost'}
                  onClick={() => handleDelete(product._id)}
                >
                  {isLoading ? <Spinner sm /> : <Trash size={20} />}
                </Button>
              );
            },
          },
        ]}
        data={data.data.feedbacks}
      />
    </div>
  );
};

export default Page;
