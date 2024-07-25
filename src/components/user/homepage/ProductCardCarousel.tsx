'use client';
import { FC } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay, Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';
import useFetch from '@/hooks/useFetch';
import { getAllCategories, getProductsByView, getSubCategories } from '@/api';
import { Button } from '@/components/ui/button';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';
import { Skeleton } from '@/components/ui/skeleton';
interface pageProps {}

const ProductCardCarousel: FC<pageProps> = () => {
  const { data, isLoading } = useFetch('product', getProductsByView);

  const fakeProducts = Array.from({ length: 10 });
  const isMobile = useMediaQueryProvide();
  const swiper = useSwiper();
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-full my-10   overflow-hidden">
      <p className="font-extrabold text-2xl my-5">
        The Lastest, <p className="text-muted-foreground inline">The New</p>{' '}
      </p>

      <Swiper
        slidesPerView={isMobile ? 1.5 : 4.5}
        spaceBetween={isMobile ? 5 : 30}
        modules={[Pagination, Scrollbar]}
        className="mySwiper"
      >
        {data?.data?.map((product: any, index: number) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCardCarousel;
