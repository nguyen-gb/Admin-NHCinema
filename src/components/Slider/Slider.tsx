/* eslint-disable import/no-unresolved */
import { Autoplay, Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Product as ProductType } from 'src/types/product.type'
import Product from '../Product'

const breakpoints = {
  '1024': {
    slidesPerView: 4
  },
  '768': {
    slidesPerView: 3
  },
  '540': {
    slidesPerView: 2
  },
  '0': {
    slidesPerView: 1
  }
}

interface Props {
  products: ProductType[]
  isLoading: boolean
}

export default function Slider({ products, isLoading }: Props) {
  return (
    <Swiper
      breakpoints={breakpoints}
      modules={[Autoplay, Navigation, A11y]}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false
      }}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {isLoading &&
        Array.from({ length: 4 }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className='relative mx-[20px] cursor-pointer overflow-hidden rounded-xl border border-slate-800 p-[2px] backdrop-blur-3xl hover:shadow-ct'>
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
          </SwiperSlide>
        ))}
      {!isLoading &&
        products &&
        products.map((product) => (
          <SwiperSlide key={product._id}>
            <Product product={product} />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
