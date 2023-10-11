import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <div className='group'>
      <div className='relative mx-[20px] cursor-pointer overflow-hidden rounded-xl border border-slate-800 p-[2px] backdrop-blur-3xl hover:shadow-ct'>
        <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
        <div className='inline-flex h-full w-full items-center justify-center rounded-xl bg-slate-950 p-1 text-sm font-medium text-white backdrop-blur-3xl'>
          <img
            src='https://touchcinema.com/uploads/phim-2021/1200x1800-01-poster.jpg'
            alt=''
            className='object-cover'
          />
          <div className='invisible absolute bottom-0 left-0 right-0 top-0 z-10 rotate-180 cursor-default bg-white/70 opacity-0 transition-all duration-500 group-hover:visible group-hover:origin-left group-hover:rotate-0 group-hover:opacity-100'>
            <div className='mx-3 my-auto flex h-full flex-col items-center justify-center text-[16px] leading-[40px]'>
              <Link
                to={`${path.home}movie/${generateNameId({ name: product.name, id: product._id })}`}
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
                  Chi tiết
                </div>
              </Link>
              <Link
                to={`${path.home}movie/${generateNameId({ name: product.name, id: product._id })}`}
                className='mb-4 max-w-fit cursor-pointer bg-secondary px-3 py-1 uppercase'
              >
                <div className='flex items-center justify-center'>
                  Mua vé
                  <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' className='ml-2 h-6' />
                </div>
              </Link>
              <div className='mb-4 max-w-fit text-[16px] leading-relaxed'>
                <div className='flex items-center justify-center text-secondary'>
                  <b className='flex-shrink-0 capitalize'>Thời lượng:</b>
                  <span className='line-clamp-1'>100 phút</span>
                </div>
                <div className='flex items-center justify-center text-secondary'>
                  <b className='flex-shrink-0 capitalize'>Thể loại:</b>
                  <span className='line-clamp-1'>Hành động, kinh dị, bí ẩn</span>
                </div>
                <div className='flex items-center justify-center text-secondary'>
                  <b className='flex-shrink-0 capitalize'>Định dạng:</b>
                  <span className='line-clamp-1'>2D</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-[20px] mb-[16px] p-4'>
        <Link
          to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}
          className='text-[17px] font-normal uppercase text-white hover:underline'
        >
          <div className='mb-2 text-center'>
            SHIN - CẬU BÉ BÚT CHÌ: ĐẠI CHIẾN SIÊU NĂNG LỰC ~SUSHI BAY~ (LỒNG TIẾNG)
          </div>
        </Link>
        <div className='text-center text-[16px] font-semibold text-primary'>Khởi chiếu 25/08/2023</div>
      </div>
    </div>
  )
}
