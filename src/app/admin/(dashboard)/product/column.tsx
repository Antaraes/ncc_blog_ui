'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { truncateText } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: (info) => {
      const text = info.getValue()!.toString();
      const id = info.row.original._id as any;
      const truncatedText = truncateText(text, 10);
      return (
        <Link
          target="__blank"
          href={`/product/${id}`}
          dangerouslySetInnerHTML={{ __html: truncatedText }}
        ></Link>
      );
    },
  },

  // {
  //   accessorKey: 'content',
  //   header: 'Content',
  //   cell: (info) => {
  //     const text = info.getValue()!.toString();
  //     const truncatedText = truncateText(text, 50); // Adjust the length as needed
  //     return <div dangerouslySetInnerHTML={{ __html: truncatedText }}></div>;
  //   },
  // },
  {
    accessorKey: 'main_media',
    header: 'Main Media',
    cell: (info) => {
      const media = info.getValue() as string;
      const isVideo = media && media.endsWith('.mp4');
      return isVideo ? (
        <video width="50" height="50" controls>
          <source
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${media}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          alt="Card background"
          width={100}
          height={100}
          className="object-contain"
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${media}`}
        />
      );
    },
  },

  {
    accessorKey: 'external_link',
    header: 'External Link',
    cell: (info) => (
      <a
        href={info.getValue() as any}
        target="_blank"
        rel="noopener noreferrer"
      >
        {info.getValue() as any}
      </a>
    ),
  },
  {
    accessorKey: 'message_link',
    header: 'Message Link',
    cell: (info) =>
      info.getValue() ? (
        <a
          href={info.getValue() as any}
          target="_blank"
          rel="noopener noreferrer"
        >
          {info.getValue() as any}
        </a>
      ) : (
        'No link'
      ),
  },
  {
    accessorKey: 'view',
    header: 'Views',
  },
  {
    accessorKey: 'rank',
    header: ({ column }) => {
      return (
        <button
          className="flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Rank
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: (info: { getValue: () => any }) => {
      const date = new Date(info.getValue());
      const formattedDate = format(date, 'd MMM yyyy');
      return <p>{formattedDate}</p>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: (info: { getValue: () => any }) => {
      const date = new Date(info.getValue());
      const formattedDate = format(date, 'd MMM yyyy');
      return <p>{formattedDate}</p>;
    },
  },
];
