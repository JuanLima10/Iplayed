import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

import { cn } from '@/common/utils/cn.util'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const fontMono = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'IPlayed',
    template: 'IPlayed | %s',
  },
  description:
    'Dynamic platform where gamers converge to share their insights, critique, and celebrate the world of gaming.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'antialiased',
        fontMono.variable,
        'font-sans',
        inter.variable
      )}
    >
      <body className="mx-auto max-w-360">
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
