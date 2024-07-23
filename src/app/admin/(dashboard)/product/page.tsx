import { FC } from 'react';
import ProductPage from './ProductPage';
import { Metadata } from 'next';

interface pageProps {}

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_COMPANY_NAME} - Dashboard/Product Stock`,
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
