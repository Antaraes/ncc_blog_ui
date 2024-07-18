'use client';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AddProductService } from '@/services/product/AddProduct.service';
import {
  CircleX,
  CopyCheck,
  Cross,
  Eye,
  HeartIcon,
  PlusIcon,
  Send,
  Trash,
} from 'lucide-react';
import { Sheet } from 'react-modal-sheet';

import { Pagination, Autoplay } from 'swiper/modules';
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

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface PageProps {}

const CreateProductPage: FC<PageProps> = ({}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filesList, setFiles] = useState<any[]>();
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
  } = AddProductService(filesList!);
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
  }, [getValues('content')]);

  const handleImageUpload = (newFiles: FileList) => {
    if (newFiles.length > 5) {
      toast.error('No more than 5 media files are allowed');
    }
    const updatedFiles = [
      ...Array.from(filesList || []),
      ...Array.from(newFiles),
    ];

    setFiles(updatedFiles.slice(0, 5));

    const imageUrls = updatedFiles.slice(0, 5).map((file) => {
      let url = URL.createObjectURL(file);
      let urlType = file.name;
      return { url, urlType };
    });

    setUploadedImages(imageUrls);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    filesList?.splice(index, 1);
    setUploadedImages(updatedImages);
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <p className="text-4xl border-secondary font-bold">Add New Blog</p>
      <hr className="h-px my-8 border-0 bg-gray-700" />
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid w-full items-center gap-10  md:grid-cols-2 justify-between">
          <div className="hidden lg:block ">
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

          <div className="hidden lg:block ">
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
                  className="max-h-[500px] overflow-y-scroll "
                  onChange={field.onChange}
                />
              )}
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="hidden lg:block ">
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

          <div className="hidden lg:block ">
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

          <div className="hidden lg:block ">
            <h4 className="text-2xl font-bold">Rank</h4>
            <p className="text-foreground">Enter the blog rank (optional)</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="rank">
              Rank
            </Label>
            <Input
              id="rank"
              type="number"
              {...register('rank')}
              placeholder="Enter Rank.."
            />
            {errors.rank && (
              <p className="text-red-500">{errors.rank.message}</p>
            )}
          </div>

          <div className="hidden lg:block ">
            <h4 className="text-2xl font-bold">Category </h4>
            <p className="text-foreground">Enter the category</p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="font-bold" htmlFor="category_id">
                Category
              </Label>
              <Link
                target="__blank"
                href={'/admin/category/create?type=sub_category'}
              >
                <PlusIcon />
              </Link>
            </div>
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

          <div className="hidden lg:block ">
            <h4 className="text-2xl font-bold">Medias</h4>
            <p className="text-foreground">Upload blog images</p>
          </div>
          <div>
            <Label className="font-bold" htmlFor="medias">
              Medias
            </Label>

            {uploadedImages.length > 0 ? (
              <div>
                <div className="grid grid-cols-3 gap-4 mt-5 ">
                  {uploadedImages.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col relative items-center  h-[100px] xl:w-[200px] xl:h-[200px] w-[100px] overflow-hidden "
                    >
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
                          width={200}
                          height={200}
                          className="object-contain"
                          src={`${item.url}`}
                        />
                      )}
                      {mainMediaIndex === index && (
                        <div className="image-overlay"></div>
                      )}
                      {/* <label className="flex items-center">
                        <input
                          type="radio"
                          className="absolute top-0 left-0  flex items-center justify-center border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none"
                          name="main_media"
                          value={index}
                          checked={mainMediaIndex === index}
                          onChange={() => handleMainMediaIndexChange(index)}
                        />
                      </label> */}
                      <Button
                        type="button"
                        variant={'link'}
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-0 right-0  flex items-center justify-center "
                      >
                        <CircleX size={20} className="fill-red-600" />
                      </Button>
                    </div>
                  ))}
                  {uploadedImages.length < 5 && (
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-[100px] xl:h-[200px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100   "
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <PlusIcon />
                      </div>
                      <input
                        type="file"
                        maxLength={5}
                        {...register('medias')}
                        multiple
                        max={5}
                        className="hidden"
                        id="dropzone-file"
                        onChange={(e) => handleImageUpload(e.target.files!)}
                      />
                    </label>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100   "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    type="file"
                    maxLength={5}
                    {...register('medias')}
                    multiple
                    max={5}
                    className="hidden"
                    id="dropzone-file"
                    onChange={(e) => handleImageUpload(e.target.files!)}
                  />
                </label>
              </div>
            )}
            {errors.medias && (
              <p className="text-red-500">{errors.medias.message}</p>
            )}
          </div>
        </div>
        <div className="py-10 flex items-center md:justify-end">
          <Button disabled={isLoading} type="submit" className="px-10">
            {isLoading && <Spinner />}
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
