import { FC } from 'react';
import CreateProductPage from './CreateProduct';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_COMPANY_NAME} - Dashboard/Create Product`,
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
