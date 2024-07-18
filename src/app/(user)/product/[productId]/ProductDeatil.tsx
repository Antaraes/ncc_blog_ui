'use client';
import { FC, useEffect, useState } from 'react';
import Spinner from '@/components/common/Spinner';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CopyCheck, CopyIcon, Eye, HeartIcon, Send } from 'lucide-react';
import 'swiper/css';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
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

interface ProductClientComponentProps {
  productId: any;
}

const ProductClientComponent: FC<ProductClientComponentProps> = ({
  productId,
}) => {
  const isMobile = useMediaQueryProvide();
  const { data, isLoading } = useFetch('eachProduct', () =>
    getDetailProduct(productId)
  );
  const [showFullContent, setShowFullContent] = useState(false);
  const [truncatedContent, setTruncatedContent] = useState<string>('');
  const { setWishlistCount } = useWishlistContext();
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; text: string }[]
  >([]);
  const [copied, setCopied] = useState(false);
  const [savepost, setSavePost] = useState(false);

  const handleCopy = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
    <div className="w-full h-full relative text-black">
      <div className="w-full h-[400px]">
        {isVideo ? (
          <video controls className="w-[80%] h-[80%] object-contain bg-black">
            <source
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.data.blog.medias[0].path}`}
            />
            Your Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.data.blog.medias[0].path}`}
            width={800}
            alt="main media"
            height={800}
            className="h-full w-full  object-contain object-center lg:h-full lg:w-full"
          />
        )}
      </div>
      <div
        className="grid md:grid-rows-3 
      md:grid-flow-col gap-4 px-4 py-4 leading-10 border-b-2 border-black/80 my-10 "
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
              <Button variant={'link'} className="border border-black bg-white">
                <Eye color="black" />
                <p className="text-black">{data.data.blog.view}</p>
              </Button>
              <Button variant={'link'} className="border border-black bg-white">
                <Popover>
                  <PopoverTrigger>
                    <Send color="black" />
                  </PopoverTrigger>
                  <PopoverContent className="w-full">
                    <p className="font-bold text-lg">Contact with us</p>
                    <a href={data.data.blog.message_link} target="_black">
                      Message me
                    </a>
                    <p className="font-bold text-lg">
                      To Know About More this article
                    </p>
                    <a href={data.data.blog.external_link} target="_black">
                      Link
                    </a>
                    <p className="font-bold text-lg">Share this article</p>
                    <div className="flex items-center">
                      <p className="text-muted-foreground">
                        {window.location.href}
                      </p>
                      <Button
                        onClick={handleCopy}
                        variant={'link'}
                        className=" text-black font-bold  "
                      >
                        {copied ? <CopyCheck /> : <CopyIcon />}
                      </Button>
                    </div>
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
        </div>
      </div>
      <div className="flex items-center justify-center w-[90%] mx-auto">
        <Swiper
          slidesPerView={isMobile ? 1.5 : 2.5}
          spaceBetween={isMobile ? 5 : 30}
          modules={[Pagination]}
          className="mySwiper"
        >
          {data.data.blog.medias.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <div className="lg:h-[300px] lg:w-[300px] h-[200px] w-[200px] flex-shrink-0 text-black">
                <Image
                  alt="Relaxing app background"
                  className="h-full w-full  object-contain object-center lg:h-full lg:w-full"
                  width={500}
                  height={300}
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.path}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="lg:hidden flex items-center gap-4 bg-black px-5 py-2 rounded-3xl  fixed bottom-3 left-1/2 transform -translate-x-1/2 z-40">
        <HeartIcon
          onClick={handleWishlistClick}
          className={`${savepost ? 'fill-red-500' : 'fill-white'}`}
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Eye color="black" fill="white" />
            </TooltipTrigger>
            <TooltipContent>{data.data.blog.view}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Sheet>
          <SheetTrigger>
            <Send color="black" fill="white" />
          </SheetTrigger>
          <SheetContent side={'bottom'}>
            <p className="font-bold text-lg">Contact with us</p>
            <a href={data.data.blog.message_link} target="_black">
              Message me
            </a>
            <p className="font-bold text-lg">To Know About More this article</p>
            <a href={data.data.blog.external_link} target="_black">
              Link
            </a>
            <p className="font-bold text-lg">Share this article</p>
            <div className="flex items-center">
              <p className="text-muted-foreground">{window.location.href}</p>
              <Button
                onClick={handleCopy}
                variant={'link'}
                className=" text-black font-bold  "
              >
                {copied ? <CopyCheck /> : <CopyIcon />}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ProductClientComponent;
