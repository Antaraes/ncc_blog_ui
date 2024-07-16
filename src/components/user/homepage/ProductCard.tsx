import { truncateText } from '@/lib/utils';
import Image from 'next/image';
import { FC } from 'react';

interface ProductCardProps {
  product: any;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { main_media, title, content, _id, view } = product;
  const isVideo = main_media && main_media.endsWith('.mp4');
  const truncatedText = truncateText(content, 10);
  return (
    <div className=" group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200  group-hover:opacity-75 h-40 lg:h-80">
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
            width={320}
            height={320}
            className="h-full w-full object-contain object-center lg:h-full lg:w-full"
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${main_media}`}
          />
        )}
      </div>
      <div className="mt-4 flex flex-col justify-between">
        <div>
          <p className=" font-medium text-xl">{title}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: truncatedText }}
          className="text-muted-foreground font-medium text-large"
        ></div>
      </div>
    </div>
  );
};

export default ProductCard;
