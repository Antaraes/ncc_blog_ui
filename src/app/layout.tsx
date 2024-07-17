import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Provider from './provider';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Provider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
