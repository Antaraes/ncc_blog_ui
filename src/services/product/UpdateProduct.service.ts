import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { getDetailProduct, getSubCategories, updateProduct } from '@/api';
import useFetch from '@/hooks/useFetch';
import API from '@/api/interceptor';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddBlogFormValues } from './AddProduct.service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  external_link: z.string().min(1, { message: 'Link is required' }),
  message_link: z.string().min(1, { message: 'Link is required' }),
  rank: z.any().optional(),
  category_id: z.string().min(1, { message: 'Category ID is required' }),
  medias_to_remove: z.array(z.string()).optional(),
  medias: z
    .unknown()
    .transform((value) => {
      return value as FileList;
    })

    .refine((files) => files.length <= 5, {
      message: 'No more than 5 media files are allowed',
    }),
});
export const UpdateProductService = (
  productId: any,
  filesList: any[],
  deletedArrayImage: string[]
) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const { data: loadProductData, refetch } = useFetch('each_product', () =>
    getDetailProduct(productId)
  );
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
    reset,
  } = useForm<AddBlogFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: loadProductData?.data?.blog.title,
      external_link: loadProductData?.data?.blog.external_link,
    },
  });
  useEffect(() => {
    if (loadProductData) {
      reset({
        title: loadProductData?.data?.blog.title,
        content: loadProductData?.data?.blog.content,
        external_link: loadProductData?.data?.blog.external_link,
        message_link: loadProductData?.data?.blog.message_link,
        rank: loadProductData?.data?.blog.rank,
        category_id: loadProductData?.data?.blog.category_id,
        medias: loadProductData?.data?.blog.medias,
      });
    }
  }, [loadProductData, reset]);

  const { data: subCategories, isLoading: categoriesLoading } = useFetch(
    'category',
    getSubCategories
  );

  const navigate = useRouter();
  useEffect(() => {
    refetch();
  }, [productId]);

  const mutation = useMutation({
    mutationFn: (data: any) => updateProduct(productId, data),
    onSuccess: () => {
      toast.success('Blog added successfully');
      navigate.push(`/admin/product?category=${getValues('category_id')}`);
    },
    onError: (error: any) => {
      console.error('Blog creation failed!', error);
      toast.error('Blog creation failed', error.message);
    },
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    if (
      filesList &&
      loadProductData?.data?.blog?.medias.length + filesList.length > 5
    ) {
      toast.error('Total media files cannot exceed 5');
      return;
    }
    formData.append('_method', 'PUT');

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
    if (deletedArrayImage) {
      formData.append('medias_to_remove', JSON.stringify(deletedArrayImage));
    }
    formData.append('category_id', data.category_id);

    if (filesList) {
      filesList.map((media, index) => {
        formData.append(`medias`, media);
      });
    }

    mutation.mutate(formData);
  };

  return {
    register,
    subCategories,
    errors,
    isLoading: mutation.isPending || isLoading,
    handleSubmit,
    onSubmit,
    setValue,
    getValues,
    isSuccess,
    control,
    loadProductData,
  };
};
