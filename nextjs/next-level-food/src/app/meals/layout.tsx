import { ReactNode } from 'react';

interface MealsLayoutProps {
  children: ReactNode;
}

export default function MealsLayout({ children }: MealsLayoutProps) {
  return <>{children}</>;
}
