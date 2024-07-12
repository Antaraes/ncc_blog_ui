'use client';
import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AddProductService } from '@/services/product/AddProduct.service';
import { Trash } from 'lucide-react';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import 'react-quill/dist/quill.snow.css';
import Spinner from '@/components/common/Spinner';
import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import Image from 'next/image';

interface PageProps {}

const ProductPage: FC<PageProps> = ({}) => {
  const {
    register,
    subCategories,
    errors,
    isLoading,
    handleSubmit,
    onSubmit,
    setValue,
    isSuccess,
    control,
  } = AddProductService();

  const [mainMediaIndex, setMainMediaIndex] = useState<number>(0);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);

  const handleImageUpload = (files: FileList) => {
    const imageUrls = Array.from(files).map((file) => {
      let url = URL.createObjectURL(file);
      let urlType = file.name;
      return { url, urlType };
    });
    setUploadedImages(imageUrls);
  };

  // Handle main media index change
  const handleMainMediaIndexChange = (index: number) => {
    setMainMediaIndex(index);
    setValue('main_media_index', index);
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <p className="text-4xl border-secondary font-bold">Add New Blog</p>
      <hr className="h-px my-8 border-0 bg-gray-700" />
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid w-full items-center gap-10 grid-cols-2 justify-between">
          <div>
            <h4 className="text-2xl font-bold">Title</h4>
            <p className="text-foreground">Enter the blog title</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              {...register('title', { required: 'Title is required' })}
              placeholder="Enter Title.."
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <h4 className="text-2xl font-bold">Content</h4>
            <p className="text-foreground">Enter the blog content</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="content">
              Content
            </Label>

            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div>
            <h4 className="text-2xl font-bold">External Link</h4>
            <p className="text-foreground">Enter an external link (optional)</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="external_link">
              External Link
            </Label>
            <Input
              id="external_link"
              type="text"
              {...register('external_link')}
              placeholder="Enter External Link.."
            />
            {errors.external_link && (
              <p className="text-red-500">{errors.external_link.message}</p>
            )}
          </div>

          <div>
            <h4 className="text-2xl font-bold">Message Link</h4>
            <p className="text-foreground">Enter a message link (optional)</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="message_link">
              Message Link
            </Label>
            <Input
              id="message_link"
              type="text"
              {...register('message_link')}
              placeholder="Enter Message Link.."
            />
            {errors.message_link && (
              <p className="text-red-500">{errors.message_link.message}</p>
            )}
          </div>

          <div>
            <h4 className="text-2xl font-bold">Rank</h4>
            <p className="text-foreground">Enter the blog rank (optional)</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="rank">
              Rank
            </Label>
            <Input
              id="rank"
              type="text"
              {...register('rank')}
              placeholder="Enter Rank.."
            />
            {errors.rank && (
              <p className="text-red-500">{errors.rank.message}</p>
            )}
          </div>

          <div>
            <h4 className="text-2xl font-bold">Category </h4>
            <p className="text-foreground">Enter the category</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="category_id">
              Category
            </Label>
            <select
              id="category_id"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...register('category_id', {
                required: 'Category is required',
              })}
            >
              <option value="">Select Category</option>
              {subCategories?.data?.map(
                (category: { name: string; _id: string }) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                )
              )}
            </select>
            {errors.category_id && (
              <p className="text-red-500">{errors.category_id.message}</p>
            )}
          </div>

          <div>
            <h4 className="text-2xl font-bold">Medias</h4>
            <p className="text-foreground">Upload blog images</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="medias">
              Medias
            </Label>
            <Input
              id="medias"
              type="file"
              {...register('medias')}
              multiple
              onChange={(e) => handleImageUpload(e.target.files!)}
            />
            {uploadedImages.length > 0 && (
              <div>
                <div className="grid grid-co gap-4">
                  {uploadedImages.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {item.urlType.endsWith('.mp4') ? (
                        <video
                          autoPlay
                          muted
                          loop
                          preload="none"
                          width={200}
                          height={200}
                        >
                          <source src={`${item.url}`} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          alt="Card background"
                          width={100}
                          height={100}
                          className="z-0  object-cover"
                          src={`${item.url}`}
                        />
                      )}
                      <label>
                        <input
                          type="radio"
                          name="main_media"
                          value={index}
                          checked={mainMediaIndex === index}
                          onChange={() => handleMainMediaIndexChange(index)}
                        />
                        Main
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {errors.medias && (
              <p className="text-red-500">{errors.medias.message}</p>
            )}
          </div>
        </div>
        <div className="py-10 flex items-center justify-end">
          <Button disabled={isLoading} type="submit" className="px-10">
            {isLoading && <Spinner />}
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductPage;
