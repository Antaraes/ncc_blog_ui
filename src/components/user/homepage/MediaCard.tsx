import Spinner from '@/components/common/Spinner';
import { Card } from '@/components/ui/card';
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
        <Card className="aspect-h-1 aspect-w-1 w-full  lg:aspect-none h-full lg:min-h-[400px] xl:min-h-[500px]   transition-all ease-in-out duration-300 ">
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative p-4 lg:h-[300px] xl:h-[400px] lg:p-8 hover:scale-105"
          >
            {isVideo ? (
              <video
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
                // src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${medias[0].path}`}
                src={`http://127.0.0.1:5000/uploads/blog/66a2a18eef5e88ddd167b9b7-388335-trailer.mp4.mp4`}
                // src={
                //   'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                // }
              ></video>
            ) : (
              <Image
                alt="Card background"
                width={800}
                height={800}
                className=" h-80 w-72 object-contain object-center lg:h-full lg:w-full "
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${medias[0].path}`}
              />
            )}
          </motion.div>
          <div className="  cursor-pointer m-2 text-black  ">
            <p className=" text-xs text-center font-medium   text-black/80 uppercase ">
              {title}
            </p>
          </div>
        </Card>
      </>
    </section>
  );
};

export default MediaCard;
