'use client';
import { useMemo, useState } from 'react';
import { getProductsByRankandView, addFeedback } from '@/api';
import Spinner from '@/components/common/Spinner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MediaCard from '@/components/user/homepage/MediaCard';
import ProductCardCarousel from '@/components/user/homepage/ProductCardCarousel';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';

import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function Home() {
  const { data, isLoading } = useFetch('head-blogs', getProductsByRankandView);
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await addFeedback({ email, content });
      toast.success('Feedback submitted successfully');
      setEmail('');
      setContent('');
    } catch (error: any) {
      setError('An error occurred while submitting feedback.');
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner lg />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-between w-[90%] mx-auto">
      <div className="w-full gap-2 grid grid-cols-12 grid-rows-2">
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
          <p className="font-bold text-3xl">Lets Talk</p>
          <p className="text-muted-foreground">
            Have some big idea or brand to develop and need help? Then reach out
            wed love to hear about your project and provide help.
          </p>
          <br />
          <p className="font-bold text-3xl">Email</p>
          <a href="mailto:blog@email.com" className="text-base block">
            blog@email.com
          </a>
          <br />
          <p className="font-bold text-3xl">Social</p>
          <a href="https://instagram.com" className="text-base block">
            Instagram
          </a>
          <a href="https://twitter.com" className="text-base block">
            Twitter
          </a>
          <a href="https://facebook.com" className="text-base block">
            Facebook
          </a>
        </div>
        <div className="w-1/2">
          <form onSubmit={handleSubmit}>
            <Label className="font-bold" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email.."
              required
            />
            <br />
            <Label className="font-bold" htmlFor="content">
              Content
            </Label>
            <ReactQuill
              id="content"
              theme="snow"
              value={content}
              onChange={setContent}
              className="h-[100px]"
              placeholder="Enter Content.."
            />
            <br />
            <Button type="submit" className="btn btn-primary mt-10">
              Submit
            </Button>
          </form>
          {loading && <Spinner />}
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
      </div>
    </main>
  );
}
