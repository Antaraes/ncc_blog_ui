'use client';
import { useParams } from 'next/navigation';
import { FC } from 'react';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { mainCategory, subCategory } = useParams();
  return (
    <div>
      {mainCategory}-{subCategory}
    </div>
  );
};

export default Page;
