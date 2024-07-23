import { FC } from 'react';
import Profile from './Profile';
import { Metadata } from 'next';

interface pageProps {}

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_COMPANY_NAME} - Admin Profile`,
};

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Profile />
    </>
  );
};

export default page;
