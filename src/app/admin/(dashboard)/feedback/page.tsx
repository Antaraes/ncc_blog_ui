import { FC } from 'react';
import FeedbackList from './FeedbackList';
import { Metadata } from 'next';

interface pageProps {}

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_COMPANY_NAME} - Dashboard/Customer Feedback List`,
};

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <FeedbackList />
    </>
  );
};

export default page;
