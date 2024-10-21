// #region Imports

import type { Metadata } from 'next';

import { ReactNode } from 'react';

import '@/ui/globals.css';
import { inter } from '@/ui/fonts';

// #endregion

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
