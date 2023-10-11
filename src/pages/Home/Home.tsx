/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { Autoplay, Scrollbar, A11y, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation } from 'react-i18next'

import productApi from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'
import Slider from 'src/components/Slider'
import bannerApi from 'src/apis/banner.api'
// import Product from './components/Product'
// import Pagination from 'src/components/Pagination'
// import categoryApi from 'src/apis/category.api'
// import AsideFilter from './components/AsideFilter'
// import SortProductList from './components/SortProductList'

export default function Home() {
  const { t } = useTranslation('home')
  const queryConfig1: QueryConfig = useQueryConfig({ status: 1 })
  const queryConfig2: QueryConfig = useQueryConfig({ status: 2 })

  const { data: dataBanner, isLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: () => {
      return bannerApi.getBanners()
    }
    // keepPreviousData: true,
    // staleTime: 3 * 60 * 1000
  })

  const { data: dataShowing, isLoading: isLoading1 } = useQuery({
    queryKey: ['products', queryConfig1],
    queryFn: () => {
      return productApi.getProducts(queryConfig1 as ProductListConfig)
    }
    // keepPreviousData: true,
    // staleTime: 3 * 60 * 1000
  })
  const { data: dataComing, isLoading: isLoading2 } = useQuery({
    queryKey: ['products', queryConfig2],
    queryFn: () => {
      return productApi.getProducts(queryConfig2 as ProductListConfig)
    }
    // keepPreviousData: true,
    // staleTime: 3 * 60 * 1000
  })

  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => {
  //     return categoryApi.getCategories()
  //   }
  // })

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('home')} | NHCinema</title>
        <meta name='description' content={t('home-des')} />
      </Helmet>
      <div className='mb-[40px]'>
        <Swiper
          slidesPerView={1}
          modules={[Autoplay, Scrollbar, Pagination, A11y]}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false
          }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {isLoading && (
            <div className='h-full w-full'>
              <div role='status' className='animate-pulse shadow'>
                <div className='mb-4 flex min-h-screen items-center justify-center rounded bg-gray-300 dark:bg-gray-700'>
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
          )}
          {dataBanner &&
            dataBanner.data.data.map((banner) => (
              <SwiperSlide key={banner._id}>
                <div className='w-full'>
                  <img className='h-full w-full object-cover' src={banner.file} alt={banner.title} />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className='container'>
        <div className='mb-[40px]'>
          <div className='flex items-center justify-center pb-[40px]'>
            <div className='relative z-[1] justify-self-center bg-primary text-[14px] uppercase shadow-ct3d transition-colors'>
              <div className='absolute bottom-0 right-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div className='absolute bottom-0 left-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div className='relative z-[9] flex items-center justify-between bg-primary p-[10px]'>
                <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' />
                <div className='mx-[15px] text-[18px] uppercase text-white'>{t('movie-is-showing')}</div>
              </div>
            </div>
          </div>
          {dataShowing && <Slider products={dataShowing.data.data} isLoading={isLoading1} />}
        </div>
        <div className='mb-[40px]'>
          <div className='flex items-center justify-center pb-[40px]'>
            <div className='relative z-[1] justify-self-center bg-primary text-[14px] uppercase shadow-ct3d transition-colors'>
              <div className='absolute bottom-0 right-[-15px] top-0 z-[1] w-[30px] skew-x-[15deg] bg-inherit shadow-ct3d'></div>
              <div className='absolute bottom-0 left-[-15px] top-0 z-[1] w-[30px] skew-x-[15deg] bg-inherit shadow-ct3d'></div>
              <div className='relative z-[9] flex items-center justify-between bg-primary p-[10px]'>
                <div className='mx-[15px] text-[18px] uppercase text-white'>{t('movie-coming-soon')}</div>
                <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' />
              </div>
            </div>
          </div>
          {dataComing && <Slider products={dataComing.data.data} isLoading={isLoading2} />}
        </div>
      </div>
    </div>
  )
}
