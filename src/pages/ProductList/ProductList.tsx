import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
// import { NavLink } from 'react-router-dom'

import productApi from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import Product from 'src/components/Product'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'
// import Pagination from 'src/components/Pagination'
// import categoryApi from 'src/apis/category.api'
// import AsideFilter from './components/AsideFilter'
// import SortProductList from './components/SortProductList'

export default function ProductList() {
  const { t } = useTranslation('home')
  const [status, setStatus] = useState(1)
  const queryConfig: QueryConfig = useQueryConfig({ status: status })
  const [isComing, setIsComing] = useState(false)

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    }
    // keepPreviousData: true,
    // staleTime: 3 * 60 * 1000
  })

  const handleClickShowing = () => {
    setIsComing(false)
    setStatus(1)
  }
  const handleClickComing = () => {
    setIsComing(true)
    setStatus(2)
  }

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('product-list-des')} | NHCinema</title>
        <meta name='description' content={t('product-list-des')} />
      </Helmet>
      <div className='container'>
        <div className='my-[40px]'>
          <div className='flex flex-wrap items-center justify-center gap-6 pb-[40px]'>
            <button
              onClick={handleClickShowing}
              className={classNames(
                'relative z-[1] justify-self-center text-[14px] uppercase shadow-ct3d transition-all',
                {
                  'scale-100 bg-primary': !isComing,
                  'scale-90 bg-quaternary': isComing
                }
              )}
            >
              <div className='absolute bottom-0 right-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div className='absolute bottom-0 left-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div
                className={classNames(
                  'relative z-[9] flex items-center justify-between bg-primary p-[10px] transition-all',
                  {
                    'bg-primary': !isComing,
                    'bg-quaternary': isComing
                  }
                )}
              >
                <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' />
                <div className='mx-[15px] text-[18px] uppercase text-white'>{t('movie-is-showing')}</div>
              </div>
            </button>
            <button
              onClick={handleClickComing}
              className={classNames(
                'relative z-[1] justify-self-center text-[14px] uppercase shadow-ct3d transition-all',
                {
                  'scale-100 bg-primary': isComing,
                  'scale-90 bg-quaternary': !isComing
                }
              )}
            >
              <div className='absolute bottom-0 right-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div className='absolute bottom-0 left-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div
                className={classNames('relative z-[9] flex items-center justify-between p-[10px] transition-all', {
                  'bg-primary': isComing,
                  'bg-quaternary': !isComing
                })}
              >
                <div className='mx-[15px] text-[18px] uppercase text-white'>{t('movie-coming-soon')}</div>
                <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' />
              </div>
            </button>
          </div>
          {isLoading && (
            <div className='col-span-10'>
              <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className='relative mx-[10px] cursor-pointer overflow-hidden rounded-xl border border-slate-800 p-[2px] backdrop-blur-3xl hover:shadow-ct'
                  >
                    <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#fd0083_50%,#E2CBFF_100%)]' />
                    <div className='inline-flex h-full w-full items-center justify-center rounded-xl bg-slate-950 p-1 text-sm font-medium text-white backdrop-blur-3xl'>
                      <div role='status' className='w-full animate-pulse shadow'>
                        <div className='flex min-h-[375px] w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700'>
                          <svg
                            className='h-10 w-10 text-gray-200 dark:text-gray-600'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 20 18'
                          >
                            <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!isLoading && productsData && (
            <div className='col-span-10'>
              <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {productsData.data.data.map((product) => (
                  <div className='col-span-1' key={product.genre_id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              {/* <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
