import { getDetailProduct } from '@/api';
import { FC } from 'react';
import ProductClientComponent from './ProductDeatil';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  return <ProductClientComponent productId={params.productId} />;
};

export default ProductPage;
