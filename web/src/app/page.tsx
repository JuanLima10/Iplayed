import HomePage from './(pages)/home/page'
import PagesLayout from './(pages)/layout'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <PagesLayout>
      <HomePage />
    </PagesLayout>
  )
}
