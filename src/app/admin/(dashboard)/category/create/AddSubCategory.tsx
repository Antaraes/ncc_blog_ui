'use client';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/common/Spinner';
import { AddSubcategoryService } from '@/services/category/AddSubCatgory.service';

interface PageProps {}

const SubcategoryPage: FC<PageProps> = ({}) => {
  const {
    register,
    errors,
    isLoading,
    handleSubmit,
    onSubmit,
    isSuccess,
    parentCategories,
    isLoadingCategories,
  } = AddSubcategoryService();

  return (
    <div className="w-full flex flex-col justify-center">
      <p className="text-4xl border-secondary font-bold">Add New Subcategory</p>
      <hr className="h-px my-8 border-0 bg-gray-700" />
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid w-full items-center gap-10 grid-cols-2 justify-between">
          <div>
            <h4 className="text-2xl font-bold">Subcategory Name</h4>
            <p className="text-foreground">Enter the subcategory name</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="name">
              Subcategory Name
            </Label>
            <Input
              id="name"
              type="text"
              {...register('name', {
                required: 'Subcategory name is required',
              })}
              placeholder="Enter Subcategory Name.."
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <h4 className="text-2xl font-bold">Description</h4>
            <p className="text-foreground">Enter the description</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="description">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              {...register('description', {
                required: 'Description is required',
              })}
              placeholder="Enter Description.."
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <h4 className="text-2xl font-bold">Parent Category</h4>
            <p className="text-foreground">Select the parent category</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="parentCategoryId">
              Parent Category
            </Label>
            <select
              id="parentCategoryId"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...register('parent_category_id', {
                required: 'Parent Category ID is required',
              })}
              defaultValue=""
            >
              <option value="" disabled>
                Select Parent Category
              </option>
              {isLoadingCategories ? (
                <option>Loading...</option>
              ) : (
                parentCategories?.data.map((category: any) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            {errors.parent_category_id && (
              <p className="text-red-500">
                {errors.parent_category_id.message}
              </p>
            )}
          </div>

          <div></div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Spinner sm /> : 'Submit'}
          </Button>
        </div>
      </form>
      {isSuccess && <p>Subcategory added successfully!</p>}
    </div>
  );
};

export default SubcategoryPage;
