'use client';
import { FC, useEffect, useState } from 'react';
import Spinner from '@/components/common/Spinner';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CopyCheck, CopyIcon, Eye, HeartIcon, Send } from 'lucide-react';
import 'swiper/css';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import 'swiper/css/pagination';
import { truncateText } from '@/lib/utils';
import { useWishlistContext } from '@/context/wishlistContext';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';
import useFetch from '@/hooks/useFetch';
import { getDetailProduct } from '@/api';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ShareModal from '@/components/common/ShareModal';
import ProductCardCarousel from '@/components/user/homepage/ProductCardCarousel';
import FeedbackSection from '@/components/user/FeedbackSection';
import NotFound from '@/app/not-found';

interface ProductClientComponentProps {
  productId: any;
}

const ProductClientComponent: FC<ProductClientComponentProps> = ({
  productId,
}) => {
  const isMobile = useMediaQueryProvide();
  const { data, isLoading, status, error, fetchStatus } = useFetch(
    'eachProduct',
    () => getDetailProduct(productId)
  );

  const [showFullContent, setShowFullContent] = useState(false);
  const [truncatedContent, setTruncatedContent] = useState<string>('');
  const { setWishlistCount } = useWishlistContext();
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; text: string }[]
  >([]);

  const [savepost, setSavePost] = useState(false);

  useEffect(() => {
    if (data) {
      truncateContent(data.data.blog.content);
    }
  }, [data]);

  const truncateContent = (content: string) => {
    const extractTextContent = (html: string) => {
      return html.replace(/<[^>]+>/g, '');
    };

    const findTagIndex = (html: string, tagName: string, startIndex = 0) => {
      const regex = new RegExp(`<${tagName}[^>]*>(.*?)</${tagName}>`, 'gi');
      const match = regex.exec(html.slice(startIndex));
      return match ? startIndex + match.index : -1;
    };

    const headingTags = ['h1', 'h2', 'h3', 'h4', 'strong'];
    let firstHeadingIndex = -1;
    let firstHeadingTag = '';

    for (const tag of headingTags) {
      const index = findTagIndex(content, tag);
      if (
        index !== -1 &&
        (firstHeadingIndex === -1 || index < firstHeadingIndex)
      ) {
        firstHeadingIndex = index;
        firstHeadingTag = tag;
      }
    }

    if (firstHeadingIndex !== -1) {
      let truncatedText = content.slice(0, firstHeadingIndex);

      const secondHeadingIndex = findTagIndex(
        content,
        firstHeadingTag,
        firstHeadingIndex + 1
      );
      if (secondHeadingIndex !== -1) {
        truncatedText = content.slice(0, secondHeadingIndex);
      }

      return truncatedText;
    } else {
      return content;
    }
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleWishlistClick = () => {
    const currentUrl = window.location.href;
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const existingIndex = wishlist.findIndex(
      (item: any) => item.url === currentUrl
    );

    if (existingIndex !== -1) {
      wishlist = wishlist.filter(
        (item: any, index: number) => index !== existingIndex
      );
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {
      wishlist.push({ url: currentUrl, title: data.data.blog.title });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    setSavePost(wishlist.some((item: any) => item.url === currentUrl));
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    if (data) {
      const tempDivElement = window.document.createElement('div');
      tempDivElement.innerHTML = data.data.blog.content;

      const headings = tempDivElement.querySelectorAll('h1, h2, h3, h4,strong');
      const tocItems = Array.from(headings).map((heading, index) => ({
        id: `toc-${index}`,
        text: heading.textContent || '',
      }));

      setTableOfContents(tocItems);
    }
  }, [data]);

  if (error?.message === 'Request failed with status code 404') {
    return (
      <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-40 h-40 dark:text-gray-400"
          >
            <path
              fill="currentColor"
              d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
            ></path>
            <rect
              width="176"
              height="32"
              x="168"
              y="320"
              fill="currentColor"
            ></rect>
            <polygon
              fill="currentColor"
              points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
            ></polygon>
            <polygon
              fill="currentColor"
              points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
            ></polygon>
          </svg>
          <p className="text-3xl">Blog Not Found</p>
          <a
            rel="noopener noreferrer"
            href="/"
            className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
          >
            Back to homepage
          </a>
        </div>
      </section>
    );
  }
  if (!data) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner lg />
      </div>
    );
  }

  const truncatedContents = truncateText(data.data.blog.content, 100);
  const isVideo =
    data.data.blog.main_media && data.data.blog.main_media.endsWith('.mp4');

  return (
    <div className="w-full  h-full relative text-black">
      <div className=" ">
        <div className=" w-full h-[400px]">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {data.data.blog.medias.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                {isVideo ? (
                  <video
                    controls
                    className="w-[80%] h-[80%] object-contain bg-black"
                  >
                    <source
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.path}`}
                    />
                    Your Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.path}`}
                    width={800}
                    alt="main media"
                    height={800}
                    className="h-full w-full  object-contain object-center lg:h-full lg:w-full"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className=" w-full grid md:grid-rows-3 
      md:grid-flow-col gap-4 px-4 py-4 leading-10 my-10 "
        >
          <div className="p-4 w-full col-span-12 md:row-span-3  border-black">
            <div className="flex justify-between w-full items-center">
              <p className="font-medium text-xl md:text-2xl w-full ">
                {data.data.blog.title}
              </p>
              <div className="p-4 w-full hidden lg:flex items-center justify-end md:gap-10 gap-3 ">
                <Button
                  variant={'link'}
                  onClick={handleWishlistClick}
                  className="border border-black bg-white"
                >
                  <HeartIcon
                    className={`${savepost ? 'fill-red-500' : 'fill-black'}`}
                  />
                </Button>
                <Button
                  variant={'link'}
                  className="border border-black bg-white"
                >
                  <Eye color="black" />
                  <p className="text-black">{data.data.blog.view}</p>
                </Button>
                <Button
                  variant={'link'}
                  className="border border-black bg-white"
                >
                  <Popover>
                    <PopoverTrigger>
                      <Send color="black" />
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <ShareModal
                        external_link={data.data.blog.external_link}
                        message_link={data.data.blog.message_link}
                      />
                    </PopoverContent>
                  </Popover>
                </Button>
              </div>
            </div>
            <hr className="h-px my-8 bg-black border-0" />
            <div
              id="blog-content"
              dangerouslySetInnerHTML={{
                __html: data.data.blog.content,
              }}
              className="md:text-lg text-base lg:w-[90%] mx-auto"
            ></div>
            <hr className="h-px my-8 bg-black border-0" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-[90%] mx-auto">
        <ProductCardCarousel />
      </div>
      <div className="w-[80%] mx-auto">
        <FeedbackSection />
      </div>
      <div className="lg:hidden flex items-center gap-4 bg-black px-5 py-2 rounded-3xl  fixed bottom-3 left-1/2 transform -translate-x-1/2 z-40">
        <HeartIcon
          onClick={handleWishlistClick}
          className={`${savepost ? 'fill-red-500' : 'fill-white'}`}
        />

        <div className="flex">
          <Eye color="black" fill="white" />
          <span className="text-white inline">{data.data.blog.view}</span>
        </div>

        <Sheet>
          <SheetTrigger>
            <Send color="black" fill="white" />
          </SheetTrigger>
          <SheetContent side={'bottom'}>
            <ShareModal
              message_link={data.data.blog.message_link}
              external_link={data.data.blog.external_link}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ProductClientComponent;
