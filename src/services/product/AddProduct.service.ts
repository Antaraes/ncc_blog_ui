'use client';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { addNewProduct, getSubCategories } from '@/api'; // Ensure you have an API function to add a blog
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useFetch from '@/hooks/useFetch';

export interface AddBlogFormValues {
  title: string;
  content: string;
  external_link?: string;
  message_link?: string;
  rank?: string;
  category_id: string;

  medias?: FileList;
  main_media_index?: number;
}

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  external_link: z.string().min(1, { message: 'Link is required' }),
  message_link: z.string().min(1, { message: 'Link is required' }),
  rank: z.string().min(0, { message: "Can't lower than zero" }).optional(),
  category_id: z.string().min(1, { message: 'Category ID is required' }),
  medias: z
    .unknown()
    .transform((value) => {
      return value as FileList;
    })
    .refine((files) => files.length == 0, {
      message: 'At least one file',
    })
    .refine((files) => files.length <= 5, {
      message: 'No more than 5 media files are allowed',
    }),
});

export const AddProductService = (files: any[]) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AddBlogFormValues>({
    resolver: zodResolver(schema),
  });
  const navigate = useRouter();

  const blogMutation = useMutation({
    mutationFn: (blogData: any) => {
      return addNewProduct(blogData);
    },
    onSuccess: () => {
      toast.success('Blog added successfully');
      navigate.push(`/admin/product?category=${getValues('category_id')}`);
    },
    onError: (error: any) => {
      toast.error('Blog creation failed', error.message);
    },
  });

  const { data: subCategories, isLoading: categoriesLoading } = useFetch(
    'category',
    getSubCategories
  );

  const onSubmit = (data: AddBlogFormValues) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.external_link) {
      formData.append('external_link', data.external_link);
    }
    if (data.message_link) {
      formData.append('message_link', data.message_link);
    }
    if (data.rank) {
      formData.append('rank', data.rank);
    }
    formData.append('category_id', data.category_id);

    if (data.medias) {
      files.map((media, index) => {
        formData.append(`medias`, media);
      });
    }

    blogMutation.mutate(formData);
  };

  return {
    isSuccess: blogMutation.isSuccess,
    subCategories,
    onSubmit,
    register,
    getValues,
    handleSubmit,
    errors,
    setValue,
    control,
    isLoading: blogMutation.isPending,
  };
};
