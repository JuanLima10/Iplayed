'use client'
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';

import { PaginationProps } from '@/Types/Pagination';

export function SearchPagination(props: PaginationProps) {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const pages = Math.ceil(props.itemsLength / props.perPage)
  const search = searchParams.get('search')
  const page = Number(searchParams.get('page') ?? '1')

  function PageClick({ selected }: any) {
    router.push(`${pathName}?search=${search}&page=${selected + 1}`)
  }

  if (pages > 1) {
    return (
      <div className="w-full flex items-center justify-end mt-8 responsive:justify-center">
        <ReactPaginate
          forcePage={page - 1}
          previousLabel={
            page > 1 ?
              <button className="cursor-pointer bg-blue-900 text-white-100 rounded-full transition-colors p-1 hover:bg-white-200">
                <ArrowLeft size={24} />
              </button> :
              <button className="text-gray-500 p-1" disabled>
                <ArrowLeft size={24} />
              </button>
          }
          pageCount={pages}
          onPageChange={PageClick}
          nextLabel={
            page < pages ?
              <button className="cursor-pointer bg-blue-900 text-white-100 rounded-full transition-colors p-1 hover:bg-white-200">
                <ArrowRight size={24} />
              </button> :
              <button className="text-gray-500 p-1" disabled>
                <ArrowRight size={24} />
              </button>

          }
          className="flex items-center justify-center text-white-100 gap-4 responsive:gap-3 small-screen:gap-1"
          activeClassName="active"
          activeLinkClassName="text-white-200"
          pageClassName="hover:text-white-200"
          marginPagesDisplayed={pages <= 7 ? 3 : 2}
        />
      </div>
    )
  }
}