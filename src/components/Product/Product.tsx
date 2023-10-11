import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { generateNameId } from 'src/utils/utils'
// import ProductRating from 'src/components/ProductRating'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  const { i18n, t } = useTranslation('product')
  return (
    <div className='group flex justify-center sm:justify-between'>
      <div className='relative mx-[10px] max-w-fit cursor-pointer overflow-hidden rounded-xl border border-slate-800 p-[2px] backdrop-blur-3xl hover:shadow-ct'>
        <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#fd0083_50%,#E2CBFF_100%)]' />
        <div className='inline-flex h-full w-full items-center justify-center rounded-xl bg-slate-950 p-1 text-sm font-medium text-white backdrop-blur-3xl'>
          <img
            src={product.poster}
            alt={i18n.language === 'vi-VN' ? product.name : product.english_name}
            className='object-cover'
          />
          <div className='invisible absolute bottom-0 left-0 right-0 top-0 z-10 rotate-180 cursor-default bg-white/70 opacity-0 transition-all duration-500 group-hover:visible group-hover:origin-left group-hover:rotate-0 group-hover:opacity-100'>
            <div className='mx-4 my-auto flex h-full flex-col items-center justify-center text-[16px] leading-[40px]'>
              <div>
                <div className='text-lg font-semibold uppercase text-white'>
                  <div className='mb-2 line-clamp-2 text-center font-bold text-primary'>
                    {i18n.language === 'vi-VN' ? product.name : product.english_name}
                  </div>
                </div>
                <div className='mb-2 text-center text-base font-medium text-tertiary'>
                  {t('premiere')}: {product.release.split(' ')[0]}
                </div>
                <div className='mb-4 w-full text-[16px] leading-relaxed'>
                  <div className='flex items-center justify-center text-secondary'>
                    <b className='flex-shrink-0 capitalize'>{t('duration')}:</b>
                    <span className='line-clamp-1'>
                      {product.duration} {t('minutes')}
                    </span>
                  </div>
                  <div className='flex items-center justify-center text-secondary'>
                    <b className='flex-shrink-0 capitalize'>{t('category')}:</b>
                    <span className='line-clamp-1'>{product.genre_name}</span>
                  </div>
                  <div className='flex items-center justify-center text-secondary'>
                    <b className='flex-shrink-0 capitalize'>{t('format')}:</b>
                    <span className='line-clamp-1'>2D</span>
                  </div>
                </div>
              </div>
              <Link
                to={`${path.home}movie/${generateNameId({ name: product.name, id: String(product._id) })}`}
                className='mb-4 max-w-fit bg-primary px-3 py-1 uppercase'
              >
                <div className='flex cursor-pointer items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-1 h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                    />
                  </svg>
                  {t('detail')}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
