'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { addCategory } from '@/api'; // Make sure you have an API function to add a category
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
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
    onError: (error) => {
      console.error('Category creation failed!', error);
      toast.error('Category creation failed');
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
