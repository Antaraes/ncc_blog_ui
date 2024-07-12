import EmailModal from '@/components/common/EmailModal';
import { truncateText } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => {
      const email = info.getValue()!.toString();
      const content = info.row.original.content;
      return (
        <EmailModal email={email} content={content}>
          <button className="text-blue-500 underline">{email}</button>
        </EmailModal>
      );
    },
  },
  {
    accessorKey: 'content',
    header: 'Content',
    cell: (info) => {
      const text = info.getValue()!.toString();
      const truncatedText = truncateText(text, 5);
      return <div dangerouslySetInnerHTML={{ __html: truncatedText }}></div>;
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
];
