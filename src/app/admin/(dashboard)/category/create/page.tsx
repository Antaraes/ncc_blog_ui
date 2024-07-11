import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddCategoryPage from './AddCategory';
import AddSubcategoryPage from './AddSubCategory';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="w-full">
      <Tabs defaultValue="main_category" className="w-full">
        <TabsList>
          <TabsTrigger value="main_category">Main Categroy</TabsTrigger>
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
  );
};

export default page;
