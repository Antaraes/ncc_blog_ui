import { useSortable } from '@dnd-kit/sortable';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { CSS } from '@dnd-kit/utilities';

export const DraggableImage = ({
  id,
  url,
  index,
  onRemove,
  onSelect,
  selectedItems,
}: {
  id: any;
  url: any;
  index: number;
  selectedItems: any;
  onRemove: any;
  onSelect: any;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative ${
        selectedItems.includes(index) ? 'border-2 border-red-500' : ''
      }`}
      onClick={() => onSelect(index)}
    >
      <Image
        src={url}
        alt="uploaded image"
        width={100}
        height={100}
        className="object-cover w-full h-full"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full"
      >
        <Trash size={16} />
      </button>
    </div>
  );
};
