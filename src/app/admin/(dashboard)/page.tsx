import { Metadata } from 'next';
import { FC } from 'react';

interface pageProps {}

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_COMPANY_NAME} - Dashboard`,
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
