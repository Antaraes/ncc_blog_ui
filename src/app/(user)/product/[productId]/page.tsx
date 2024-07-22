import { getDetailProduct } from '@/api';
import { FC } from 'react';
import ProductClientComponent from './ProductDeatil';

interface ProductPageProps {
  params: {
    productId: string;
  };
}
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  // read route params
  const id = params.productId;

  return {
    title: `Blog ${id}`,
  };
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  return <ProductClientComponent productId={params.productId} />;
};

export default ProductPage;
