'use client';
import Spinner from '@/components/common/Spinner';
import { truncateText } from '@/lib/utils';
import React, { Suspense } from 'react';

const MediaCard = ({ data }: { data: any }) => {
  const { main_media, title, content } = data;

  const isVideo = main_media.endsWith('.mp4');
  const truncatedText = truncateText(content, 50); // Adjust the length as needed

  return (
    <>
      <div className="absolute z-10 bottom-1 left-2 flex-col items-start text-white">
        <p className="text-tiny text-white/60 uppercase font-bold">{title}</p>

        <div
          dangerouslySetInnerHTML={{ __html: truncatedText }}
          className="text-white font-medium text-large"
        ></div>
      </div>
      {isVideo ? (
        <video autoPlay muted loop preload="none">
          <source
            src={`http://localhost:8000/${main_media}`}
            type="video/mp4"
          />
        </video>
      ) : (
        <img
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src={`path-to-your-media-directory/${main_media}`}
        />
      )}
    </>
  );
};

export default MediaCard;
