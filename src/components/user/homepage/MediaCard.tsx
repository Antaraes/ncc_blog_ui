import Spinner from '@/components/common/Spinner';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';
import { truncateText } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';

const MediaCard = ({ data, leastone }: { data: any; leastone?: boolean }) => {
  const { main_media, title, content, _id, view } = data;
  const isMobile = useMediaQueryProvide();

  const isVideo = main_media && main_media.endsWith('.mp4');
  const truncatedText = truncateText(content, 10);
  const truncatedTitle = truncateText(title, 2);
  const route = useRouter();

  return (
    <section
      onClick={() => route.push(`product/${_id}`)}
      className="cursor-pointer  image-box "
    >
      <>
        {/* <div className="absolute z-10 bottom-1 left-2 flex-col items-start cursor-pointer text-white">
            <p className="text-tiny text-white/60 uppercase font-bold">
              {truncatedTitle}
            </p>

            <div
              dangerouslySetInnerHTML={{ __html: truncatedText }}
              className="text-white font-medium text-large"
            ></div>
          </div> */}
        <div className="">
          {isVideo ? (
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${main_media}`}
              // src={
              //   'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
              // }
            ></video>
          ) : (
            <Image
              alt="Card background"
              width={400}
              height={300}
              className=" img"
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${main_media}`}
            />
          )}
        </div>
      </>
    </section>
  );
};

export default MediaCard;
