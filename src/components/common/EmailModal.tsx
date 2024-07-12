'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

const EmailModal = ({
  email,
  content,
  children,
}: {
  email: string;
  content: string;
  children: any;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer underline">{children}</span>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Email Details</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Content:</strong>
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="whitespace-pre-wrap"
          ></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;