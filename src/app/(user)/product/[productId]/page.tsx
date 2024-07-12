'use client';
import { useEffect, FC, useState } from 'react';
import { useParams } from 'next/navigation';
import Spinner from '@/components/common/Spinner';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';
import { CopyCheck, CopyIcon, Eye, HeartIcon, Send } from 'lucide-react';
import { getDetailProduct } from '@/api';
import 'swiper/css';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import 'swiper/css/pagination';
import { useMediaQuery } from '@react-hook/media-query';
import { truncateText } from '@/lib/utils';
import { useWishlistContext } from '@/context/wishlistContext';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { productId } = useParams();
  const { data, isLoading } = useFetch('eachProduct', () =>
    getDetailProduct(productId)
  );
  const isMobile = useMediaQuery('(max-width: 1280px)');

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
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  useEffect(() => {
    if (!isLoading && data) {
      truncateContent(data.data.blog.content);
    }
  }, [isLoading, data]);

  const truncateContent = (content: string) => {
    // Helper function to extract text content without tags
    const extractTextContent = (html: string) => {
      return html.replace(/<[^>]+>/g, ''); // Remove all HTML tags
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

      // Find the second occurrence after the first one
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
    if (!isLoading && data) {
      const tempDivElement = window.document.createElement('div');
      tempDivElement.innerHTML = data.data.blog.content;

      const headings = tempDivElement.querySelectorAll('h1, h2, h3, h4,strong');
      const tocItems = Array.from(headings).map((heading, index) => ({
        id: `toc-${index}`,
        text: heading.textContent || '',
      }));

      setTableOfContents(tocItems);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner lg />
      </div>
    );
  }
  const truncatedContents = truncateText(data.data.blog.content, 100);

  return (
    <div className="w-full h-full text-black">
      <Image
        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.data.blog.main_media}`}
        width={800}
        alt="main media"
        height={300}
        className="object-cover w-full h-[400px]"
      />
      <div className="grid md:grid-rows-3 md:grid-flow-col gap-4 px-4 py-4 leading-10 border-b-2 border-black/80 my-10">
        <div className="p-4 w-full col-span-12 md:col-span-7 md:row-span-3 border-r-2 border-black">
          <p className="font-medium text-2xl">{data.data.blog.title}</p>
          <hr className="h-px my-8 bg-black border-0" />
          <div
            id="blog-content"
            dangerouslySetInnerHTML={{
              __html: showFullContent
                ? data.data.blog.content
                : truncatedContents,
            }}
            className="text-lg"
          ></div>
          <div className="flex items-center justify-center backdrop-blur-xl">
            {!showFullContent && (
              <Button
                className="mt-4 border text-center text-black  border-black bg-white"
                variant={'secondary'}
                onClick={toggleContent}
              >
                Read More
              </Button>
            )}
          </div>
        </div>

        <div className="p-4 w-full md:col-span-5 col-span-12  flex items-center justify-center gap-10 md:border-b-2 border-black/50">
          <Button
            onClick={handleWishlistClick}
            className="border border-black bg-white"
          >
            <HeartIcon
              className={`${savepost ? 'fill-red-500' : 'fill-black'}`}
            />
          </Button>
          <Button className="border border-black bg-white">
            <Eye color="black" />
            <p className="text-black">{data.data.blog.view}</p>
          </Button>
          <Button className="border border-black bg-white">
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
        <div className="p-4 w-full rounded-xl md:row-span-2 md:col-span-5 hidden md:block">
          <p className="font-medium text-xl">Table Of Contents</p>
          {/* Render dynamically generated table of contents */}
          <ul className="list-disc ml-4">
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center w-[90%] mx-auto">
        <Swiper
          slidesPerView={isMobile ? 2.5 : 3}
          spaceBetween={isMobile ? 5 : 30}
          // centeredSlides={true}

          modules={[Pagination]}
          className="mySwiper"
        >
          {data.data.blog.medias.map((item: string[], index: number) => (
            <SwiperSlide key={index}>
              <div className="md:h-[400px] md:w-[400px] h-[200px] w-[200px] flex-shrink-0 text-black">
                <Image
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover rounded-xl"
                  width={500}
                  height={300}
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Page;
