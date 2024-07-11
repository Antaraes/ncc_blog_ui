'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from './data-table';
import { columns } from './column';
import useFetch from '@/hooks/useFetch';
import { getMainCategories, getSubCategories } from '@/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { data: main_categories } = useFetch(
    'main_categories',
    getMainCategories
  );
  const { data: sub_categories } = useFetch('sub_categories', getSubCategories);
  return (
    <>
      <div className="w-full">
        <Tabs defaultValue="main_category" className="w-full">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="main_category" className="text-2xl font-bold">
                Main Categroy
              </TabsTrigger>
              <TabsTrigger value="sub_category" className="text-2xl font-bold">
                Sub Category
              </TabsTrigger>
            </TabsList>
            <Button>
              <Link href={'category/create'}>Add Categroy</Link>
            </Button>
          </div>
          <TabsContent value="main_category">
            <DataTable
              columns={[
                ...columns,
                {
                  accessorKey: 'sub_categories',
                  header: 'Sub Categories',
                  cell: (info) => {
                    const subcategory = info.getValue() as any;
                    if (subcategory?.length > 0) {
                      return <p>{subcategory.length}</p>;
                    }
                    return <p>0</p>;
                  },
                },
                {
                  id: 'actions',
                  cell: (info) => {
                    const category = info.row.original as any;
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
                          <DropdownMenuItem className="text-red-500">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  },
                },
              ]}
              data={main_categories ? main_categories.data : []}
            />
          </TabsContent>
          <TabsContent value="sub_category">
            <DataTable
              columns={[
                ...columns,

                {
                  id: 'actions',
                  cell: (info) => {
                    const category = info.row.original as any;
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
                          <DropdownMenuItem className="text-red-500">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  },
                },
              ]}
              data={sub_categories ? sub_categories.data : []}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
