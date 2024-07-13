'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { cookies } from 'next/headers';
import { setCookie } from 'cookies-next';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const LoginService = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });
  const navigate = useRouter();
  // const [isLoading, setIsloading] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(true);
  const loginMutation = useMutation({
    mutationFn: async (loginData: LoginFormValues) => login(loginData),
    onSuccess: (data: any) => {
      console.log('Login successful!', data.data.data.access_token);

      setCookie('ecommerce_token', data.data.data.access_token);
      toast.success('Login successful');
      navigate.push('/admin');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);

    loginMutation.mutate(data);
  };
  return {
    isSuccess: loginMutation.isSuccess,
    onSubmit,
    form,
    isLoading: loginMutation.isPending,
  };
};
