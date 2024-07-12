'use client';
import { getProductsByRankandView } from '@/api';
import Spinner from '@/components/common/Spinner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MediaCard from '@/components/user/homepage/MediaCard';
import ProductCardCarousel from '@/components/user/homepage/ProductCardCarousel';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Home() {
  const { data, isLoading } = useFetch('head-blogs', getProductsByRankandView);
  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner lg />
      </div>
    );
  }
  console.log(process.env.API_URL);

  return (
    <main className="flex min-h-screen h-full flex-col items-center  justify-between w-[90%] mx-auto ">
      <div className="w-full gap-2 grid grid-cols-12 grid-rows-2 ">
        <div className="col-span-12 sm:col-span-6 h-[300px] relative overflow-hidden rounded-lg">
          <MediaCard data={data.data[0]} />
        </div>
        <div className="col-span-12 sm:col-span-6 h-[300px] relative overflow-hidden rounded-lg">
          <MediaCard data={data.data[1]} />
        </div>
        <div className="col-span-12 sm:col-span-4 h-[300px] relative overflow-hidden rounded-lg">
          <MediaCard data={data.data[2]} />
        </div>
        <div className="col-span-12 sm:col-span-4 h-[300px] relative overflow-hidden rounded-lg">
          <MediaCard data={data.data[3]} />
        </div>
        <div className="col-span-12 sm:col-span-4 h-[300px] relative overflow-hidden rounded-lg">
          <MediaCard data={data.data[4]} />
        </div>
      </div>
      <div className="w-full">
        <ProductCardCarousel />
      </div>
      <div className="flex justify-between w-full">
        <div className="w-1/2">
          <p className="font-bold text-3xl"> Lets Talk</p>
          <p className="text-muted-foreground">
            Have some big idea or brand to develop and need help? Then reach out
            wed love to hear about your project and provide help
          </p>
          <br />
          <p className="font-bold text-3xl">Email</p>
          <a href="mailto:blog@email.com" className="text-base block">
            blog@email.com
          </a>
          <br />
          <p className="font-bold text-3xl">Social</p>
          <a href="mailto:blog@email.com" className="text-base block">
            instagram
          </a>
          <a href="mailto:blog@email.com" className="text-base block">
            Twitter
          </a>
          <a href="mailto:blog@email.com" className="text-base block">
            Facebook
          </a>
        </div>
        <div className="w-1/2">
          <form action="">
            <Label className="font-bold" htmlFor="title">
              Email
            </Label>
            <Input
              id="title"
              type="text"
              // {...register('title', { required: 'Title is required' })}
              placeholder="Enter Email.."
            />
            <br />
            <Label className="font-bold" htmlFor="title">
              Content
            </Label>
            <ReactQuill
              id="title"
              theme="snow"
              className="h-[100px]"
              // {...register('title', { required: 'Title is required' })}
              placeholder="Enter Content.."
            />
          </form>
        </div>
      </div>
    </main>
  );
}
