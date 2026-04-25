import { Footer } from '@/src/components/shared/footer'
import { NavBar } from '@/src/components/shared/nav-bar'
import { ReactNode } from 'react'

export default async function PagesLayout({
  children,
}: {
  children: ReactNode
}) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}
