'use client';
import { FC, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleX, CopyCheck, Trash } from 'lucide-react';
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

import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DraggableImage } from '@/components/user/product/DraggableImage';

interface PageProps {}

const ProductPage: FC<PageProps> = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
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
  const [filesList, setFiles] = useState<any[]>();
  const isMobile = useMediaQueryProvide();
  const [mainMediaIndex, setMainMediaIndex] = useState<number>(0);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
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
  }, []);

  useEffect(() => {
    if (loadProductData?.data?.blog?.medias) {
      const images = loadProductData.data.blog.medias.map(
        (media: any, index: number) => ({
          url: process.env.NEXT_PUBLIC_MEDIA_URL + media.path,
        })
      );
      setUploadedImages(images);
    }
  }, [loadProductData]);
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
        const oldIndex = items.findIndex((item) => item.path === active.id);
        const newIndex = items.findIndex((item) => item.path === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
              value={loadProductData?.data.blog.title}
              {...register('title', { required: 'Title is required' })}
              placeholder="Enter Title.."
            />
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
          </div>

          <div>
            <h4 className="text-2xl font-bold">Category</h4>
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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={uploadedImages.map((image) => image.url)}
                >
                  <div className="grid grid-cols-3 gap-4">
                    {uploadedImages.map((item, index) => (
                      <DraggableImage
                        key={item.url}
                        id={item.url}
                        url={item.url}
                        onRemove={() => handleDeleteImage(index)}
                        index={index}
                        onSelect={() => handleSelectImage(index)}
                        selectedItems={selectedItems}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
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
