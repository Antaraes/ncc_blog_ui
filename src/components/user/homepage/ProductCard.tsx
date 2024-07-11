import { FC } from 'react';

interface ProductCardProps {}

const ProductCard: FC<ProductCardProps> = ({}) => {
  return (
    <div className="h-auto min-h-[300px] w-[200px] md:w-[300px] flex-shrink-0 text-black">
      <img
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover rounded-xl"
        src="https://nextui.org/images/card-example-5.jpeg"
      />
      <p className=" font-medium text-xl">
        How to Persuade Your Parents to Buy Fast Food
      </p>
      <p className="text-base text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, ratione.
      </p>
    </div>
  );
};

export default ProductCard;
