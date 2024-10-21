// #region Imports

import { ReactNode } from 'react';

import type { Metadata } from 'next';

import { MainHeader } from '@/ui/components/main-header';
import { jet_brains_mono } from '@/ui/fonts';

import '@/ui/globals.css';

// #endregion

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${jet_brains_mono.className}`}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
