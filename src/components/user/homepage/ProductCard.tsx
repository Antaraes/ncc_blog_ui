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
    <div className=" w-full  max-h-[300px] flex-shrink-0 text-black">
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
          width={100}
          height={100}
          className=" w-full h-full object-cover"
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${main_media}`}
        />
      )}
      <p className=" font-medium text-xl">{title}</p>
      <div
        dangerouslySetInnerHTML={{ __html: truncatedText }}
        className="text-muted-foreground font-medium text-large"
      ></div>
    </div>
  );
};

export default ProductCard;
