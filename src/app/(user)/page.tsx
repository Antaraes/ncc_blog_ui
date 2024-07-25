'use client';
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
import FeedbackSection from '@/components/user/FeedbackSection';

export default function Home() {
  const { data, isLoading } = useFetch('head-blogs', getProductsByRank);

  const slicedData = data?.data.slice(0, 6) || [];
  console.log(process.env.NEXT_PUBLIC_ENV);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner lg />
      </div>
    );
  }

  const mediaCards = slicedData.map((_: any, index: number) => {
    if (slicedData.length > 2) {
      return (
        <div
          key={index}
          className={` lg:col-span-4 md:col-span-6 col-span-12   relative overflow-hidden  mt-6 `}
        >
          {slicedData[index] && <MediaCard data={slicedData[index]} />}
        </div>
      );
    }
  });

  return (
    <main className="flex w-[90%] min-h-screen h-full flex-col gap-10 items-center justify-between  mx-auto">
      {data?.data.length == 0 ? (
        <DataNotAvabile />
      ) : (
        <>
          <Swiper
            className="mt-6"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
          >
            {slicedData.map((_: any, index: number) => {
              if (slicedData.length > 2) {
                return (
                  <SwiperSlide key={index}>
                    {slicedData[index] && (
                      <SlideCard data={slicedData[index]} />
                    )}
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
          {slicedData.length > 0 && (
            <div
              className={`w-[80%] gap-2 grid grid-cols-12 ${slicedData.length > 3 && 'grid-rows-2'}`}
            >
              {mediaCards}
            </div>
          )}
          <div className="w-full">
            <ProductCardCarousel />
          </div>
          <FeedbackSection />
        </>
      )}
    </main>
  );
}
