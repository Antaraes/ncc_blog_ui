'use client';
import { FC, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  CircleX,
  CopyCheck,
  Cross,
  Eye,
  HeartIcon,
  Send,
  Trash,
} from 'lucide-react';
import { useMediaQuery } from '@react-hook/media-query';

import { Switch } from '@/components/ui/switch';
import 'react-quill/dist/quill.snow.css';
import Spinner from '@/components/common/Spinner';
import { Controller } from 'react-hook-form';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { UpdateProductService } from '@/services/product/UpdateProduct.service';
import { useParams } from 'next/navigation';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';

interface PageProps {}

const ProductPage: FC<PageProps> = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    register,
    subCategories,
    errors,
    isLoading,
    handleSubmit,
    onSubmit,
    setValue,
    getValues,
    isSuccess,
    control,
    loadProductData,
  } = UpdateProductService(productId);
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; text: string }[]
  >([]);

  const isMobile = useMediaQueryProvide();
  const [mainMediaIndex, setMainMediaIndex] = useState<number>(0);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  useEffect(() => {
    if (getValues('content')) {
      const tempDivElement = window.document.createElement('div');
      tempDivElement.innerHTML = getValues('content');

      const headings = tempDivElement.querySelectorAll('h1, h2, h3, h4,strong');
      const tocItems = Array.from(headings).map((heading, index) => ({
        id: `toc-${index}`,
        text: heading.textContent || '',
      }));

      setTableOfContents(tocItems);
    }
  }, []);

  const handleImageUpload = (files: FileList) => {
    const imageUrls = Array.from(files).map((file) => {
      let url = URL.createObjectURL(file);
      let urlType = file.name;
      return { url, urlType };
    });
    setUploadedImages([...uploadedImages, ...imageUrls]);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1); // Remove image at index
    setUploadedImages(updatedImages);
  };

  const handleMainMediaIndexChange = (index: number) => {
    setMainMediaIndex(index);
    setValue('main_media_index', index);
  };
  return (
    <div className="w-full flex flex-col justify-center">
      <p className="text-4xl border-secondary font-bold">Update Blog</p>
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
              defaultValue={loadProductData?.data.blog.title}
              {...register('title', { required: 'Title is required' })}
              placeholder="Enter Title.."
            />
            {/* {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )} */}
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
                  defaultValue={loadProductData?.data.blog.content}
                  value={field.value || loadProductData?.data.blog.content}
                  onChange={field.onChange}
                />
              )}
            />
            {/* {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )} */}
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
            {/* {errors.external_link && (
              <p className="text-red-500">{errors.external_link.message}</p>
            )} */}
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
            {/* {errors.message_link && (
              <p className="text-red-500">{errors.message_link.message}</p>
            )} */}
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
            {/* {errors.rank && (
              <p className="text-red-500">{errors.rank.message}</p>
            )} */}
          </div>

          <div>
            <h4 className="text-2xl font-bold">Category </h4>
            <p className="text-foreground">Enter the category</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="category_id">
              Category
            </Label>
            {/* <select
              id="category_id"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...register('category_id')}
            >
              <option value="">Select Category</option>
              {subCategories &&
                subCategories?.data?.map(
                  (category: { name: string; _id: string }) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  )
                )}
            </select> */}
          </div>

          <div>
            <h4 className="text-2xl font-bold">Medias</h4>
            <p className="text-foreground">Upload blog images</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="medias">
              Medias
            </Label>

            {uploadedImages.length > 0 && (
              <div>
                <div className="grid grid-cols-3 gap-4 ">
                  {uploadedImages.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col relative items-center w-[200px] h-[200px]"
                    >
                      {item.urlType.endsWith('.mp4') ? (
                        <video
                          autoPlay
                          controls
                          className="absolute w-full h-full"
                        >
                          <source src={item.url} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          className="absolute w-full h-full"
                          src={item.url}
                          alt={`media-${index}`}
                          width={200}
                          height={200}
                        />
                      )}

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="absolute w-6 h-6 right-0 p-0"
                          >
                            <CopyCheck className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto">
                          <div className="flex flex-col items-center space-y-2">
                            <Label>Main Image</Label>
                            <Switch
                              onClick={() => handleMainMediaIndexChange(index)}
                              checked={mainMediaIndex === index}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Button
                        variant="destructive"
                        className="absolute w-6 h-6 left-0 p-0"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>
        {isSuccess && (
          <p className="text-green-500 mt-2">Product updated successfully!</p>
        )}
      </form>
    </div>
  );
};

export default ProductPage;
