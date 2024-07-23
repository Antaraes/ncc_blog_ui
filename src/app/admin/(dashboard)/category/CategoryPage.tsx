'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from './data-table';
import { columns } from './column';
import useFetch from '@/hooks/useFetch';
import { getMainCategories, getSubCategories, removeCategory } from '@/api';
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
import EditableRowModal from '@/components/common/EditableRowModal';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';

interface CategoryPageProps {}

const CategoryPage: FC<CategoryPageProps> = ({}) => {
  const isMobile = useMediaQueryProvide();
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { data: main_categories, refetch: mainRefetch } = useFetch(
    'main_categories',
    getMainCategories
  );

  const { data: sub_categories, refetch: subRefetch } = useFetch(
    'sub_categories',
    getSubCategories
  );
  useEffect(() => {
    setMainCategories(main_categories?.data);
    setSubCategories(sub_categories?.data);
  }, [main_categories, sub_categories]);
  const [editCategory, setEditCategory] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState('main_category');

  const { handleMutation: mainHandleMutation } = useRmoveMutation({
    apiFunction: removeCategory,
    queryKey: ['main_categories'],
  });

  const { handleMutation: subHandleMutation } = useRmoveMutation({
    apiFunction: removeCategory,
    queryKey: ['sub_categories'],
  });

  const handleMainDelete = (categoryId: string) => {
    mainHandleMutation(categoryId);
    mainRefetch();
  };

  const handleSubDelete = (categoryId: string) => {
    subHandleMutation(categoryId);
    subRefetch();
  };

  const handleEdit = (category: any) => {
    setEditCategory(category);
  };

  return (
    <>
      <div className="w-full">
        <Tabs
          defaultValue="main_category"
          className="w-full"
          onValueChange={setCurrentTab}
        >
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger
                value="main_category"
                className=" text-base md:text-2xl font-bold"
              >
                Main Category
              </TabsTrigger>
              <TabsTrigger
                value="sub_category"
                className="text-base md:text-2xl  font-bold"
              >
                Sub Category
              </TabsTrigger>
            </TabsList>
            <Button size={isMobile ? 'sm' : 'lg'}>
              <Link
                href={{
                  pathname: 'category/create',
                  query: { type: currentTab },
                }}
              >
                Add Category
              </Link>
            </Button>
          </div>
          <TabsContent value="main_category" className=" ">
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
                          <DropdownMenuItem
                            onClick={() => handleEdit(category)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => handleMainDelete(category._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  },
                },
              ]}
              data={mainCategories ? mainCategories : []}
            />
          </TabsContent>
          <TabsContent value="sub_category">
            <DataTable
              columns={[
                ...columns,
                {
                  accessorKey: 'parent_category_id',
                  header: 'Sub Categories',
                  cell: (info) => {
                    const parent_category = info.getValue() as any;
                    return <p>{parent_category && parent_category.name}</p>;
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
                          <DropdownMenuItem
                            onClick={() => handleEdit(category)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => handleSubDelete(category._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  },
                },
              ]}
              data={subCategories ? subCategories : []}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Editable Row Modal */}
      {editCategory && (
        <EditableRowModal
          isOpen={!!editCategory}
          onClose={() => setEditCategory(null)}
          category={editCategory}
          onSave={() => {
            mainRefetch();
            subRefetch();
          }}
        />
      )}
    </>
  );
};

export default CategoryPage;
