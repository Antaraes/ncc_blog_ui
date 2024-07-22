import { FC } from 'react';
import ProductPage from './ProductPage';
import { Metadata } from 'next';

interface pageProps {}

export const metadata: Metadata = {
  title: 'Dashboard/Product Page',
  icons: {
    icon: '/favicon.png',
  },
};

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <ProductPage />
    </>
  );
};

export default page;
