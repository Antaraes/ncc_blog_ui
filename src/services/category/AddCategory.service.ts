'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { addCategory, getAllCategories, updateCategory } from '@/api'; // Make sure you have an API function to add a category
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useFetch from '@/hooks/useFetch';

const schema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
});
const sub_schema = z.object({
  name: z.string().min(1, { message: 'Subcategory name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  parent_category_id: z
    .string()
    .min(1, { message: 'Parent Category ID is required' }),
});
export const AddCategoryService = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useRouter();

  const categoryMutation = useMutation({
    mutationFn: async (categoryData) => addCategory(categoryData),
    onSuccess: (data) => {
      toast.success('Category added successfully');
      navigate.push('/admin/category');
    },
    onError: (error: any) => {
      toast.error('Category creation failed', error.message);
    },
  });

  const onSubmit = (data: any) => {
    categoryMutation.mutate(data);
  };

  return {
    isSuccess: categoryMutation.isSuccess,
    onSubmit,
    register,
    handleSubmit,
    errors,
    setValue,
    control,
    isLoading: categoryMutation.isPending,
  };
};

export const UpdateCategoryService = (
  category_id: any,
  parent_category_id: boolean,
  closeModal: () => void
) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(parent_category_id ? sub_schema : schema),
  });
  const { data: parentCategories, isLoading: isLoadingCategories } = useFetch(
    'parentCategories',
    getAllCategories
  );
  const navigate = useRouter();

  const categoryMutation = useMutation({
    mutationFn: async (categoryData) =>
      updateCategory(categoryData, category_id),
    onSuccess: (data) => {
      toast.success('Category updated successfully');
      navigate.push('/admin/category');
      closeModal();
    },
    onError: (error: any) => {
      console.error('Category creation failed!', error);
      toast.error('Category creation failed', error.message);
    },
  });

  const onSubmit = (data: any) => {
    categoryMutation.mutate(data);
  };

  return {
    isSuccess: categoryMutation.isSuccess,
    onSubmit,
    isLoadingCategories,
    parentCategories,
    register,
    handleSubmit,
    errors,
    setValue,
    control,
    isLoading: categoryMutation.isPending,
  };
};
