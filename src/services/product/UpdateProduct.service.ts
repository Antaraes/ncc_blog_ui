import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { getDetailProduct, getSubCategories } from '@/api';
import useFetch from '@/hooks/useFetch';
import API from '@/api/interceptor';

export const UpdateProductService = (productId: any) => {
  const [subCategories, setSubCategories] = useState([]);
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
  } = useForm();
  console.log(loadProductData);

  const { data, isLoading: categoriesLoading } = useFetch(
    'category',
    getSubCategories
  );

  useEffect(() => setSubCategories(data), [data]);

  useEffect(() => {
    refetch();
  }, [productId]);

  const mutation = useMutation({
    mutationFn: (data: any) => {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      for (const key in data) {
        if (key === 'new_medias') {
          data[key].forEach((file: string | Blob) =>
            formData.append('new_medias', file)
          );
        } else {
          formData.append(key, data[key]);
        }
      }
      return API.post(`/blog/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => {
        console.log('success');
      },
      onError: (error) => {
        console.error('Error updating product:', error);
      },
    });
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
