import { FC } from 'react';
import FeedbackList from './FeedbackList';
import { Metadata } from 'next';

interface pageProps {}

export const metadata: Metadata = {
  title: 'Customer Feedback',
};

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <FeedbackList />
    </>
  );
};

export default page;
