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
interface FeedbackListProps {}

const FeedbackList: FC<FeedbackListProps> = ({}) => {
  const [feedbacks, setFeedback] = useState([]);
  const { handleMutation, isLoading: isDeleting } = useRmoveMutation({
    apiFunction: deleteFeedback,
    queryKey: ['feedbacks'],
  });

  const handleDelete = (productId: string) => {
    handleMutation(productId);
  };
  return (
    <div>
      <DataTable
        isDeleting={isDeleting}
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
                    <Trash size={20} />
                  </Button>
                  <EmailModal email={email} content={content}>
                    <Button variant={'link'}>Detail</Button>
                  </EmailModal>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default FeedbackList;
