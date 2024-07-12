import Spinner from '@/components/common/Spinner';
import { truncateText } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';

const MediaCard = ({ data }: { data: any }) => {
  const { main_media, title, content, _id } = data;

  const isVideo = main_media.endsWith('.mp4');
  const truncatedText = truncateText(content, 10);
  const truncatedTitle = truncateText(title, 2);
  const route = useRouter();

  return (
    <>
      <div
        onClick={() => route.push(`product/${_id}`)}
        className="absolute z-10 bottom-1 left-2 flex-col items-start cursor-pointer text-white"
      >
        <p className="text-tiny text-white/60 uppercase font-bold">
          {truncatedTitle}
        </p>

        <div
          dangerouslySetInnerHTML={{ __html: truncatedText }}
          className="text-white font-medium text-large"
        ></div>
      </div>
      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          // src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${main_media}`}
          // src={
          //   'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          // }
          src="https://dev-allaboutme.s3.ap-southeast-1.amazonaws.com/Sequence+01.mp4"
        ></video>
      ) : (
        <Image
          alt="Card background"
          width={400}
          height={300}
          className="z-0 w-full h-full object-cover"
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${main_media}`}
        />
      )}
    </>
  );
};

export default MediaCard;
