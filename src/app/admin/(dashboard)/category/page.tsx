import { FC } from 'react';
import CategoryPage from './CategoryPage';
import { Metadata } from 'next';

interface pageProps {}
export const metadata: Metadata = {
  title: 'Dashboard/Category',
};

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <CategoryPage />
    </>
  );
};

export default page;
