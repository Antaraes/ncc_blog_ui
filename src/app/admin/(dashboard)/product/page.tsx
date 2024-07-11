'use client';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/useFetch';
import Link from 'next/link';
import { FC } from 'react';
import { DataTable } from './data-table';
import { columns } from './column';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useRmoveMutation } from '@/hooks/useRemoveMutation';
import { removeProduct } from '@/api';

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { handleMutation, isLoading } = useRmoveMutation({
    apiFunction: removeProduct,
    queryKey: ['all-products'],
  });
  const handleDelete = (productId: string) => {
    handleMutation(productId);
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl font-bold">Product</p>
        <Button>
          <Link href={'product/create'}>Add New Product</Link>
        </Button>
      </div>
      <div>
        <DataTable
          columns={[
            ...columns,
            {
              id: 'actions',
              cell: (info) => {
                const product = info.row.original as any;

                return (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Page;
