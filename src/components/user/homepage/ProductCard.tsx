'use client';
import { truncateText } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ProductCardProps {
  product: any;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { medias, title, content, _id, view } = product;
  const isVideo = medias[0] && medias[0].path.endsWith('.mp4');
  const truncatedText = truncateText(content, 10);
  const route = useRouter();
  return (
    <Link className=" group relative" href={`/product/${_id}`}>
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md group-hover:opacity-75 h-[200px] ">
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
            width={320}
            height={320}
            className="h-full w-full object-contain object-center lg:h-full lg:w-full"
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${medias[0].path}`}
          />
        )}
      </div>
      <div className="mt-4 flex flex-col justify-between">
        <div>
          <p className=" font-medium text-sm">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
