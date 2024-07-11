'use client';
import { getProductsByRankandView } from '@/api';
import Spinner from '@/components/common/Spinner';
import MediaCard from '@/components/user/homepage/MediaCard';
import ProductCardCarousel from '@/components/user/homepage/ProductCardCarousel';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';

export default function Home() {
  const { data, isLoading } = useFetch('head-blogs', getProductsByRankandView);
  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner lg />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen h-full flex-col items-center  justify-between w-[90%] mx-auto ">
      <div className="w-full gap-2 grid grid-cols-12 grid-rows-2 ">
        <div className="col-span-12 sm:col-span-6 h-[300px] relative overflow-hidden rounded-lg">
          <MediaCard data={data.data[2]} />
        </div>
        <div className="col-span-12 sm:col-span-6 h-[300px] relative overflow-hidden rounded-lg">
          <div className="absolute z-10 bottom-1 left-2 flex-col items-start text-white">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Plant a tree
            </p>
            <h4 className="text-white font-medium text-large">
              Contribute to the planet
            </h4>
          </div>
          <img
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-3.jpeg"
          />
        </div>
        <div className="col-span-12 sm:col-span-4 h-[300px] relative overflow-hidden rounded-lg">
          <div className="absolute z-10 bottom-1 left-2 flex-col items-start text-white">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Supercharged
            </p>
            <h4 className="text-white font-medium text-large">
              Creates beauty like a beast
            </h4>
          </div>
          <img
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-2.jpeg"
          />
        </div>
        <div className="col-span-12 sm:col-span-4 h-[300px] relative overflow-hidden rounded-lg">
          <div className="absolute z-10 bottom-1 left-2 flex-col items-start text-white">
            <p className="text-tiny text-white/60 uppercase font-bold">New</p>
            <h4 className="text-black font-medium text-2xl">Acme camera</h4>
          </div>
          <img
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src="https://nextui.org/images/card-example-6.jpeg"
          />
        </div>
        <div className="col-span-12 sm:col-span-4 h-[300px] relative overflow-hidden rounded-lg">
          <div className="absolute z-10 bottom-1 left-2 flex-col items-start text-white">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Your day your way
            </p>
            <h4 className="text-white/90 font-medium text-xl">
              Your checklist for better sleep
            </h4>
          </div>
          <img
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-5.jpeg"
          />
        </div>
      </div>
      <div className="w-full">
        <ProductCardCarousel />
      </div>
    </main>
  );
}
