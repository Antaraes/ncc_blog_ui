'use client';
import { Button } from '@/components/ui/button';
import { FC, useEffect, useState } from 'react';
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
import EmailModal from '@/components/common/EmailModal';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [feedbacks, setFeedback] = useState([]);
  const { data, isLoading, refetch } = useFetch('feedbacks', getFeedback);
  const { handleMutation } = useRmoveMutation({
    apiFunction: deleteFeedback,
    queryKey: ['feedbacks'],
  });

  useEffect(() => {
    setFeedback(data?.data?.feedbacks);
  }, [data]);
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
              const email = info.row.original.email;
              const content = info.row.original.content;
              return (
                <div className="flex items-center">
                  <Button
                    variant={'ghost'}
                    onClick={() => handleDelete(product._id)}
                  >
                    {isLoading ? <Spinner sm /> : <Trash size={20} />}
                  </Button>
                  <EmailModal email={email} content={content}>
                    <Button variant={'link'}>Detail</Button>
                  </EmailModal>
                </div>
              );
            },
          },
        ]}
        data={feedbacks || []}
      />
    </div>
  );
};

export default Page;
