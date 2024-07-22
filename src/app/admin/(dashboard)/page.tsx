import { Metadata } from 'next';
import { FC } from 'react';

interface pageProps {}

export const metadata: Metadata = {
  title: 'Dashboard',
  icons: {
    icon: '/favicon.png',
  },
};

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <p className="text-3xl font-bold">Dashboard</p>
    </div>
  );
};

export default page;
