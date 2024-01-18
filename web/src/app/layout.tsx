import { Navbar } from '@/components/Navbar/Navbar';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'IPlayed',
    template: 'IPlayed | %s',
  },
  description: 'Organization games app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${openSans.className} relative bg-blue-900`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
