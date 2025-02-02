'use client';
import { FC, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleX, CopyCheck, PlusIcon, Trash } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';
import Spinner from '@/components/common/Spinner';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { UpdateProductService } from '@/services/product/UpdateProduct.service';
import { useParams } from 'next/navigation';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DraggableImage } from '@/components/user/product/DraggableImage';
import Link from 'next/link';
import { Cross1Icon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';

interface PageProps {}

const UpdateProductPage: FC<PageProps> = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [filesList, setFiles] = useState<any[]>();
  const [deletedArrayImage, setDeletedArrayImage] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const {
    register,
    subCategories,
    errors,
    isLoading,
    handleSubmit,
    onSubmit,
    setValue,
    watch,
    getValues,
    isSuccess,
    control,
    loadProductData,
  } = UpdateProductService(productId, filesList!, deletedArrayImage);
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; text: string }[]
  >([]);
  const isMobile = useMediaQueryProvide();
  const [mainMediaIndex, setMainMediaIndex] = useState<number>(0);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [existImage, setExistImage] = useState<any[]>([]);

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    const subscription = watch(() => {
      setIsFormDirty(true);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (getValues('content')) {
      const tempDivElement = window.document.createElement('div');
      tempDivElement.innerHTML = getValues('content');

      const headings = tempDivElement.querySelectorAll(
        'h1, h2, h3, h4, strong'
      );
      const tocItems = Array.from(headings).map((heading, index) => ({
        id: `toc-${index}`,
        text: heading.textContent || '',
      }));

      setTableOfContents(tocItems);
    }
  }, [getValues]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        handleDeleteSelectedImages();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItems]);

  const handleDeleteSelectedImages = () => {
    const updatedImages = uploadedImages.filter(
      (_, index) => !selectedItems.includes(index)
    );
    const updatedFiles = filesList?.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setUploadedImages(updatedImages);
    setFiles(updatedFiles);
    setSelectedItems([]);
  };

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

  const handleDeleteImageId = (id: string) => {
    if (deletedArrayImage.includes(id)) {
      setDeletedArrayImage(deletedArrayImage.filter((item) => item !== id));
    } else {
      setDeletedArrayImage([...deletedArrayImage, id]);
    }
  };

  const handleSelectImage = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setUploadedImages((items) => {
        const oldIndex = items.findIndex((item) => item.urlType === active.id);
        const newIndex = items.findIndex((item) => item.urlType === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    if (active.id !== over.id) {
      setFiles((items: any) => {
        const oldIndex = items.findIndex(
          (item: any) => item.name === active.id
        );
        const newIndex = items.findIndex((item: any) => item.name === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner lg />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center">
      <p className="text-4xl border-secondary font-bold">Update Blog</p>
      <hr className="h-px my-8 border-0 bg-gray-700" />
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid w-full items-center gap-10 md:grid-cols-2 justify-between">
          {/* Title */}
          <div className="hidden lg:block">
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

          {/* Content */}
          <div className="hidden lg:block">
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
                  className="max-h-[500px] overflow-y-scroll"
                  onChange={field.onChange}
                />
              )}
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}
          </div>

          {/* External Link */}
          <div className="hidden lg:block">
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

          {/* Message Link */}
          <div className="hidden lg:block">
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

          {/* Rank */}
          <div className="hidden lg:block">
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
              min={0}
              {...register('rank')}
              placeholder="Enter Rank.."
            />
            {errors.rank && (
              <p className="text-red-500">{errors.rank.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="hidden lg:block">
            <h4 className="text-2xl font-bold">Category</h4>
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
              defaultValue={loadProductData?.data?.blog.category_id}
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

          {/* Previous Medias */}
          <div className="hidden lg:block justify-center items-center">
            {loadProductData?.data?.blog.medias.length > 0 && (
              <>
                <Label className="font-bold" htmlFor="medias">
                  Previous Medias
                </Label>
                <div className="grid grid-cols-3 gap-4 mt-5 h-[200px] w-[300px]">
                  {loadProductData?.data?.blog.medias.map(
                    (item: any, index: number) => (
                      <div
                        key={item._id}
                        className={`relative group w-[100px] h-[100px] ${
                          deletedArrayImage.includes(item._id) ? 'hidden' : ''
                        }`}
                        onClick={() => handleDeleteImageId(item._id)}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.path}`}
                          alt="uploaded image"
                          width={100}
                          height={100}
                          className="object-contain w-full h-full"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImageId(item._id);
                          }}
                        >
                          <Cross1Icon fontSize={2} />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>

          {/* Medias */}
          <div>
            {errors.medias && (
              <p className="text-red-500">{errors.medias.message}</p>
            )}
            <Label className="font-bold" htmlFor="medias">
              Medias
            </Label>
            {uploadedImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 mt-5 h-[200px] w-[300px]">
                {uploadedImages.map((image, index) => (
                  <DraggableImage
                    key={image.urlType}
                    id={image.urlType}
                    url={image.url}
                    index={index}
                    selectedItems={selectedItems}
                    onSelect={() => handleSelectImage(index)}
                    onRemove={() => handleDeleteImage(index)}
                  />
                ))}
                {uploadedImages.length < 5 && (
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-[100px] xl:h-[200px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
            ) : (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
                        strokeLinecap="round"
                        strokeWidth="2"
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
          </div>
        </div>
        <div className="py-10 flex items-center md:justify-end">
          <Button
            disabled={isLoading || !isFormDirty}
            type="submit"
            className="px-10"
          >
            {isLoading && <Spinner />}
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductPage;
