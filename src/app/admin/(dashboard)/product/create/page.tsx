import { FC } from 'react';
import CreateProductPage from './CreateProduct';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Blog',
};

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <CreateProductPage />
    </>
  );
};

export default page;
