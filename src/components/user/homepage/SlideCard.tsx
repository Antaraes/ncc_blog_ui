import Spinner from '@/components/common/Spinner';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';
import { truncateText } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const SlideCard = ({ data, leastone }: { data: any; leastone?: boolean }) => {
  const { medias, title, content, _id, view, message_link } = data;
  const isMobile = useMediaQueryProvide();

  const isVideo = medias[0] && medias[0].path.endsWith('.mp4');

  const route = useRouter();

  return (
    <motion.section
      onClick={() => route.push(`product/${_id}`)}
      className="cursor-pointer group  relative image-box"
    >
      <>
        <motion.div
          className="  w-full lg:w-[90%] flex h-[200px] gap-10   lg:h-80 transition-all ease-in-out duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="  flex flex-col  justify-center items-center  cursor-pointer text-black  w-full h-full">
            <motion.p
              className="lg:text-base text-xs  uppercase font-bold"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {title}
            </motion.p>
            <div className="flex gap-2">
              <Button className="self-start mt-5 " size={'sm'}>
                <Link href={`product/${_id}`}>Read More</Link>
              </Button>
              <Button
                variant={'destructive'}
                size={'sm'}
                className="self-start mt-5"
              >
                <a
                  target="__blank"
                  href={
                    message_link !== undefined
                      ? message_link
                      : 'https://web.whatsapp.com/'
                  }
                >
                  Direct Message
                </a>
              </Button>
            </div>
          </div>
          <div className="h-full w-full lg:h-[300px] lg:w-[300px]">
            {isVideo ? (
              <video
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${medias[0].path}`}
              ></video>
            ) : (
              <Image
                alt="Card background"
                width={800}
                height={800}
                className="h-[300px] w-[300px]  object-contain object-center lg:h-full lg:w-full"
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${medias[0].path}`}
              />
            )}
          </div>
        </motion.div>
      </>
    </motion.section>
  );
};

export default SlideCard;
