import Spinner from '@/components/common/Spinner';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';
import { truncateText } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';

const MediaCard = ({ data, leastone }: { data: any; leastone?: boolean }) => {
  const { medias, title, content, _id, view } = data;
  const isMobile = useMediaQueryProvide();
  console.log(medias);

  const isVideo = medias[0].path && medias[0].path.endsWith('.mp4');
  const truncatedText = truncateText(content, 10);
  const truncatedTitle = truncateText(title, 2);
  const route = useRouter();

  return (
    <section
      onClick={() => route.push(`product/${_id}`)}
      className="cursor-pointer group    image-box "
    >
      <>
        <div className="aspect-h-1 aspect-w-1 w-[300px] h-[300px] overflow-hidden lg:aspect-none  lg:h-80 transition-all ease-in-out duration-300 ">
          <div className="relative">
            <motion.div
              className="absolute hidden group-hover:flex z-10 flex-col items-center justify-center bg-black  cursor-pointer text-white  w-full h-full"
              whileHover={{ opacity: 1, scale: 1.05 }}
              initial={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="lg:text-tiny text-xs  text-white/80 uppercase font-bold">
                {truncatedTitle}
              </p>
            </motion.div>
            {isVideo ? (
              <video
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${medias[0].path}`}
                // src={
                //   'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                // }
              ></video>
            ) : (
              <Image
                alt="Card background"
                width={800}
                height={800}
                className=" h-full w-full  object-cover object-center lg:h-[300px] lg:w-full"
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${medias[0].path}`}
              />
            )}
          </div>
        </div>
      </>
    </section>
  );
};

export default MediaCard;
