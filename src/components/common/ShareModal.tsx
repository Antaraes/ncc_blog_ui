'use client';
import { Button } from '@/components/ui/button';
import { CopyCheck, CopyIcon } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TiMessages } from 'react-icons/ti';
import { MdOutlineLink } from 'react-icons/md';
import useMediaQueryProvide from '@/hooks/useMediaQueryProvide';

interface ShareModalProps {
  message_link: string;
  external_link: string;
}

const ShareModal: FC<ShareModalProps> = ({ message_link, external_link }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const addHttps = (link: string) => {
    return `https://${link}`;
  };

  return (
    <div className="leading-10">
      <p className="font-bold text-lg">Share With</p>
      <div className="flex gap-3 text-3xl my-2 ">
        <IoLogoWhatsapp />
        <FaFacebook />
        <FaInstagramSquare />
        <FaXTwitter />
      </div>
      <p className="font-bold text-lg my-3">Contact With Us</p>
      <a
        href={
          !message_link.includes('https')
            ? addHttps(message_link)
            : message_link
        }
        rel="noopener noreferrer"
        target="_black"
        className="block my-3"
      >
        <div className="flex gap-3">
          <div className=" border-2 bg-blue-300 w-9 h-9 flex justify-center items-center rounded-full">
            <TiMessages className="text-2xl " color="blue" />
          </div>
          <div>
            <p className="text-xs font-medium">Direct Message</p>
            <p className="text-xs text-muted-foreground">
              want to buy this product
            </p>
          </div>
        </div>
      </a>
      <a
        href={
          !external_link.includes('https')
            ? addHttps(external_link)
            : external_link
        }
        target="_black"
        className="block my-3"
      >
        <div className="flex gap-3">
          <div className=" border-2 bg-green-300 w-9 h-9 flex justify-center items-center rounded-full">
            <MdOutlineLink className="text-2xl " color="green" />
          </div>
          <div>
            <p className="text-xs font-medium">Detail About This Article</p>
            <p className="text-xs text-muted-foreground">
              to know about this article
            </p>
          </div>
        </div>
      </a>

      <p className="font-bold text-lg">Share this article</p>
      <div className="flex  items-center cursor-pointer" onClick={handleCopy}>
        <p className="text-muted-foreground lg:w-full w-screen overflow-hidden">
          {window.location.href}
        </p>
        <Button
          onClick={handleCopy}
          variant={'link'}
          className=" text-black font-bold  "
        >
          {copied ? <CopyCheck /> : <CopyIcon />}
        </Button>
      </div>
    </div>
  );
};

export default ShareModal;
