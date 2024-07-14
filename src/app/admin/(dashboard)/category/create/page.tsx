'use client';
import { FC, Suspense, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddCategoryPage from './AddCategory';
import AddSubcategoryPage from './AddSubCategory';
import { useSearchParams, useRouter } from 'next/navigation';

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tabValue, setTabValue] = useState<string | null>('main_category');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      setTabValue(type);
    } else {
      setTabValue('main_category');
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setTabValue(value);
    router.push(`?type=${value}`);
  };

  return (
    <Suspense>
      <div className="w-full">
        <Tabs
          value={tabValue!}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="main_category">Main Category</TabsTrigger>
            <TabsTrigger value="sub_category">Sub Category</TabsTrigger>
          </TabsList>
          <TabsContent value="main_category">
            <AddCategoryPage />
          </TabsContent>
          <TabsContent value="sub_category">
            <AddSubcategoryPage />
          </TabsContent>
        </Tabs>
      </div>
    </Suspense>
  );
};

export default Page;
