// 'use client';
// import { FC, useEffect, useState, useRef } from 'react';
// import ProductCard from './ProductCard';

// interface ProductCardCarouselProps {
//   products: any;
// }

// const ProductCardCarousel: FC<ProductCardCarouselProps> = ({ products }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [itemsPerView, setItemsPerView] = useState(1);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startPos, setStartPos] = useState(0);
//   const [currentTranslate, setCurrentTranslate] = useState(0);
//   const [prevTranslate, setPrevTranslate] = useState(0);
//   const [animationId, setAnimationId] = useState<number | null>(null);
//   const carouselRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleResize = () => {
//       const newItemsPerView = Math.floor(window.innerWidth / 300);
//       setItemsPerView(newItemsPerView);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleNext = () => {
//     if (currentIndex < products.length - itemsPerView) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       setCurrentIndex(0);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     } else {
//       setCurrentIndex(products.length - itemsPerView);
//     }
//   };

//   const getPositionX = (event: TouchEvent | MouseEvent) => {
//     return event.type.includes('mouse')
//       ? (event as MouseEvent).pageX
//       : (event as TouchEvent).touches[0].clientX;
//   };

//   const animation = () => {
//     setCarouselTransform();
//     if (isDragging) {
//       setAnimationId(requestAnimationFrame(animation));
//     }
//   };

//   const setCarouselTransform = () => {
//     if (carouselRef.current) {
//       carouselRef.current.style.transform = `translateX(${currentTranslate}px)`;
//     }
//   };

//   const touchStart =
//     (index: number) => (event: React.TouchEvent | React.MouseEvent) => {
//       setIsDragging(true);
//       setStartPos(getPositionX(event.nativeEvent));
//       setCurrentTranslate(prevTranslate);
//       setAnimationId(requestAnimationFrame(animation));
//     };

//   const touchMove = (event: React.TouchEvent | React.MouseEvent) => {
//     if (isDragging) {
//       const currentPosition = getPositionX(event.nativeEvent);
//       const diff = currentPosition - startPos;
//       setCurrentTranslate(prevTranslate + diff);
//     }
//   };

//   const touchEnd = () => {
//     setIsDragging(false);
//     cancelAnimationFrame(animationId as number);

//     const movedBy = currentTranslate - prevTranslate;
//     if (movedBy < -100 && currentIndex < products.length - itemsPerView) {
//       setCurrentIndex(currentIndex + 1);
//     } else if (movedBy > 100 && currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//     setPrevTranslate(currentTranslate);
//   };

//   return (
//     <div className="w-[90%] mx-auto relative overflow-hidden">
//       <div
//         className="flex transition-transform duration-300 gap-5"
//         style={{
//           transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
//         }}
//         ref={carouselRef}
//         onMouseDown={touchStart(currentIndex)}
//         onMouseMove={touchMove}
//         onMouseUp={touchEnd}
//         onMouseLeave={() => {
//           if (isDragging) touchEnd();
//         }}
//         onTouchStart={touchStart(currentIndex)}
//         onTouchMove={touchMove}
//         onTouchEnd={touchEnd}
//       >
//         {products.map((product, index) => (
//           <div key={index} className="min-w-[300px] min-h-[400px]">
//             <ProductCard />
//           </div>
//         ))}
//       </div>
//       {currentIndex > 0 && (
//         <button
//           className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//           onClick={handlePrev}
//         >
//           Prev
//         </button>
//       )}
//       {currentIndex < products.length - itemsPerView && (
//         <button
//           className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//           onClick={handleNext}
//         >
//           Next
//         </button>
//       )}
//     </div>
//   );
// };

// export default ProductCardCarousel;
'use client';
import { FC } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
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
      {/* <Swiper
        slidesPerView={isMobile ? 2.5 : 4.5}
        spaceBetween={20}
        loop={true}
        // centeredSlides={true}

        modules={[Autoplay, Pagination]}
        className="mySwiper my-5"
      >
        {categories?.data.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <Button className="w-full rounded-lg" variant={'default'}>
              {item.name}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper> */}

      <p className="font-extrabold text-2xl my-3">
        The Lastest, <p className="text-muted-foreground inline">The New</p>{' '}
      </p>

      <Swiper
        slidesPerView={isMobile ? 1.5 : 3.5}
        spaceBetween={isMobile ? 5 : 30}
        // centeredSlides={true}

        modules={[Pagination]}
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
