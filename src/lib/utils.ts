import { type ClassValue, clsx } from 'clsx';

import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const truncateText = (text: string, wordLimit: number) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

export function convertToFiles(mediaArray: any[]) {
  return mediaArray.map((media) => {
    const fileName = media.path.split('/').pop(); // Extract the file name from the path
    const file = new File([new Blob()], fileName, {
      type: 'image/webp', // Change this to the correct MIME type if different
      lastModified: new Date().getTime(),
    });
    return file;
  });
}

export const convertToFile = (path: any, _id: any) => {
  // Placeholder content for demonstration
  const placeholderContent = new Blob(['Placeholder content'], {
    type: 'image/jpeg',
  });

  // Generate a random file name (can be based on path or _id if needed)
  const fileName = `${path.split('/').pop()}`;

  // Create a new File object
  const file = new File([placeholderContent], fileName, {
    type: 'image/jpeg',
  });

  return file;
};
