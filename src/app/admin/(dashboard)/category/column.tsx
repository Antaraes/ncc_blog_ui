import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'parent_category_id',
    header: 'Main Category',
    cell: (info: { getValue: () => any }) => {
      const parent_info = info.getValue() as any;
      if (parent_info) {
        return (
          <div>
            <p>{parent_info.name}</p>
          </div>
        );
      } else {
        return <p>No Parent Category</p>;
      }
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
