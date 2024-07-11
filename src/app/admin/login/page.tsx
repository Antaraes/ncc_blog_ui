'use client';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginService } from '@/services/admin/Login.service';
import Image from 'next/image';
import Spinner from '@/components/common/Spinner';
interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { form, onSubmit, isLoading } = LoginService();
  return (
    <div className="flex justify-between h-screen items-center w-full overflow-y-hidden">
      <div className="w-full flex justify-center">
        <div>
          <p className="text-4xl font-medium">Welcome back!</p>
          <p className="text-base">
            Enter your Credentials to access your account
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 my-10"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={'superadmin@gmail.com'}
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={'password@123'}
                        placeholder="1234"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isLoading ? <Spinner sm /> : 'Login'}
              </Button>
              <p className="text-center ">or</p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={'outline'}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={'/assets/google.png'}
                    width={20}
                    height={20}
                    alt="google"
                  />
                  Sign in with google
                </Button>
                <Button
                  type="button"
                  variant={'outline'}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={'/assets/apple.png'}
                    width={20}
                    height={20}
                    alt="apple"
                  />
                  Sign in with apple
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="w-1/2 md:block hidden h-full">
        <Image
          src={'/assets/chris.png'}
          width={600}
          height={200}
          className=" object-cover"
          alt="loginPage"
        />
      </div>
    </div>
  );
};

export default page;
