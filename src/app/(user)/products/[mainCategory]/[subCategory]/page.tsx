'use client';
import DataNotAvabile from '@/components/common/DataNotAvabile';
import { useParams } from 'next/navigation';
import { FC } from 'react';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { mainCategory, subCategory } = useParams();
  return (
    <div>
      <DataNotAvabile />
    </div>
  );
};

export default Page;
