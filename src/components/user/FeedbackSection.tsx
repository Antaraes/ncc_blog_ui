'use client';
import { FC } from 'react';
import { Key, useMemo, useState } from 'react';
import { getProductsByRank, addFeedback } from '@/api';
import Spinner from '@/components/common/Spinner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MediaCard from '@/components/user/homepage/MediaCard';
import ProductCardCarousel from '@/components/user/homepage/ProductCardCarousel';
import useFetch from '@/hooks/useFetch';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { register } from 'module';
import { Textarea } from '@/components/ui/textarea';
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideCard from '@/components/user/homepage/SlideCard';
import { Autoplay, Pagination } from 'swiper/modules';
import DataNotAvabile from '@/components/common/DataNotAvabile';
interface FeedbackSectionProps {}

const FeedbackSection: FC<FeedbackSectionProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setLoading] = useState(false);
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
      setSuccess('Feedback submitted successfully!');
      toast.success('Feedback submitted successfully!');
      setEmail('');
      setContent('');
    } catch (error) {
      setError('An error occurred while submitting feedback.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex  justify-between w-full  border-t-2">
      <div className="w-1/2 hidden md:block  my-3 mr-10">
        <p className="font-bold text-3xl">Lets Talk</p>
        <p className="text-muted-foreground">
          Have some big idea or brand to develop and need help? Then reach out
          wed love to hear about your project and provide help.
        </p>
        <br />
        <p className="font-bold text-3xl">Email</p>
        <a
          href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}
          className="text-base block"
        >
          {`${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}
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
      <div className="md:w-1/2 w-full my-3 ">
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
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-[100px]"
            placeholder="Enter Content.."
          />
          <br />
          <Button type="submit" className="btn btn-primary mt-5">
            {isLoading && <Spinner sm />}Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackSection;
