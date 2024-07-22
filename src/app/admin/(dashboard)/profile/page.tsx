import { FC } from 'react';
import Profile from './Profile';
import { Metadata } from 'next';

interface pageProps {}

export const metadata: Metadata = {
  title: 'Admin Profile',
};

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Profile />
    </>
  );
};

export default page;
