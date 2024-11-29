import { Mulish } from 'next/font/google'
import "./globals.css";
import { cn, constructMetadata } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const mulish = Mulish({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light !scroll-smooth'>
      <body className={cn('min-h-screen font-sans antialiased', mulish.className)}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
