import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { convert } from 'html-to-text'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { VscDebugStart } from 'react-icons/vsc'
import classNames from 'classnames'
// import { toast } from 'react-toastify'
// import DOMPurify from 'dompurify'

import productApi from 'src/apis/product.api'
import { getIdFromNameId } from 'src/utils/utils'
// import { Product as ProductType } from 'src/types/product.type'
// import { purchasesStatus } from 'src/constants/purchase'
// import Product from '../ProductList/components/Product'
// import QuantityController from 'src/components/QuantityController'
// import ProductRating from 'src/components/ProductRating'
// import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import VideoPopup from 'src/components/VideoPopup'
import DropdownCinema from 'src/components/DropdownCinema'

export default function ProductDetail() {
  // const navigate = useNavigate()
  const { i18n, t } = useTranslation('product')
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isHideShowTimes, setIsHideShowTimes] = useState(true)

  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const currentDate = new Date()
  const tomorrow = new Date(currentDate)
  tomorrow.setDate(currentDate.getDate() + 1)

  // const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  // const [activeImage, setActiveImage] = useState('')

  const product = productDetailData?.data.data
  // const currentImages = useMemo(
  //   () => (product ? product.images.slice(...currentIndexImages) : []),
  //   [product, currentIndexImages]
  // )
  // const imageRef = useRef<HTMLImageElement>(null)

  // const queryConfig: ProductListConfig = { page: '1', limit: '20', category: product?.category._id }
  // const { data: productsData } = useQuery({
  //   queryKey: ['products', queryConfig],
  //   queryFn: () => {
  //     return productApi.getProducts(queryConfig)
  //   },
  //   enabled: Boolean(product),
  //   staleTime: 3 * 60 * 1000
  // })
  // const addToCartMutation = useMutation(purchaseApi.addToCart)

  // useEffect(() => {
  //   if (product && product.images.length > 0) {
  //     setActiveImage(product.images[0])
  //   }
  // }, [product])

  // const chooseActive = (img: string) => {
  //   setActiveImage(img)
  // }

  // const next = () => {
  //   if (currentIndexImages[1] < (product as ProductType).images.length) {
  //     setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
  //   }
  // }

  // const prev = () => {
  //   if (currentIndexImages[0] > 1) {
  //     setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
  //   }
  // }

  // const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   const rect = event.currentTarget.getBoundingClientRect()

  //   const image = imageRef.current as HTMLImageElement
  //   const { naturalHeight, naturalWidth } = image

  //   //Cách 1: Lấy offsetX, offsetY đơn giản khi xử lý được bubble event
  //   const { offsetX, offsetY } = event.nativeEvent

  //   //Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
  //   //const offsetX = event.pageX - (rect.x + window.scrollX)
  //   //const offsetY = event.pageY - (rect.y + window.scrollY)

  //   const top = offsetY * (1 - naturalWidth / rect.width)
  //   const left = offsetX * (1 - naturalHeight / rect.height)

  //   image.style.width = naturalWidth + 'px'
  //   image.style.height = naturalHeight + 'px'
  //   image.style.width = 'unset'

  //   image.style.top = top + 'px'
  //   image.style.left = left + 'px'
  // }

  // const handleRemoveZoom = () => {
  //   imageRef.current?.removeAttribute('style')
  // }

  // const handleBuyCount = (value: number) => {
  //   setBuyCount(value)
  // }

  // const addToCart = () => {
  //   addToCartMutation.mutate(
  //     { buy_count: buyCount, product_id: product?._id as string },
  //     {
  //       onSuccess: (data) => {
  //         toast.success(data.data.message, { autoClose: 2000 })
  //         queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
  //       }
  //     }
  //   )
  // }

  const openVideoPopup = () => {
    setIsVideoOpen(true)
  }

  const closeVideoPopup = () => {
    setIsVideoOpen(false)
  }

  const handleShowShowTimes = () => {
    setIsHideShowTimes(false)
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  if (isLoading)
    return (
      <div className='bg-secondary'>
        <Helmet>
          <title> | NHCinema</title>
        </Helmet>
        <div className='container'>
          <div className='grid grid-cols-12'>
            <div className='relative col-span-12'>
              <div className='relative'>
                <div
                  role='status'
                  className='flex h-[500px] w-full animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700'
                >
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
              <div className='relative grid grid-cols-12 p-[15px] lg:mt-[-200px]'>
                <div className='col-span-3 hidden xl:block'>
                  <div
                    role='status'
                    className='flex h-[400px] w-full animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700'
                  >
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
                <div className='col-span-12 bg-transparent p-[15px] text-white xl:col-span-9'>
                  <div role='status' className='max-w-sm animate-pulse'>
                    <div className='mb-4 h-8 w-48 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-8 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <br />
                    <br />
                    <div className='mb-2.5 h-4 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-4 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-4 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-4 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-4 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-4 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='h-4 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <span className='sr-only'>Loading...</span>
                  </div>
                </div>
                <div className='col-span-12 my-[20px] bg-primary p-[20px] shadow-ct3d'>
                  <div role='status' className='max-w-sm animate-pulse'>
                    <div className='mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <span className='sr-only'>Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  if (!product) return
  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{product.name} | NHCinema</title>
        <meta
          name='description'
          content={convert(product.description, {
            limits: {
              maxInputLength: 150
            }
          })}
        />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-12'>
          <div className='relative col-span-12'>
            <div className='relative'>
              <img
                className='w-full object-contain'
                src={product.thumbnail}
                alt={i18n.language === 'vi-VN' ? product.name : product.english_name}
              />
              <div className='absolute bottom-0 left-0 right-0 top-0 bg-quaternary/70'>
                <div className='flex h-[80%] w-full items-center justify-center'>
                  <button
                    className='h-[60px] w-[60px] cursor-pointer rounded-full bg-primary sm:h-[80px] sm:w-[80px]'
                    onClick={openVideoPopup}
                  >
                    <VscDebugStart className='h-full w-full scale-75 text-white' />
                  </button>
                </div>
              </div>
            </div>
            <div className='relative grid grid-cols-12 p-[15px] lg:mt-[-200px]'>
              <div className='col-span-3 hidden xl:block'>
                <img src={product.poster} alt='' className='h-full w-full border-2 border-white object-cover' />
              </div>
              <div className='col-span-12 bg-transparent p-[15px] text-white xl:col-span-9'>
                <h1 className='text-2xl font-semibold uppercase text-primary lg:mt-[20px]'>
                  {i18n.language === 'vi-VN' ? product.name : product.english_name}
                </h1>
                <h2 className='mt-2 text-2xl uppercase'>
                  {i18n.language === 'vi-VN' ? product.english_name : product.name}
                </h2>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('duration')}:</strong>
                  {product.duration} {t('minutes')}
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('launched-from')}:</strong>
                  {product.release.split(' ')[0]}
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('category')}:</strong>
                  {product.genre_name}
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('format')}:</strong>
                  2D
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('director')}:</strong>
                  {product.director}
                </p>
                <p className='mt-2 flex'>
                  <strong className='inline-block w-[140px] flex-shrink-0 text-primary'>{t('performer')}:</strong>
                  <span className='line-clamp-1'>{product.performer}</span>
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('age')}:</strong>
                  <span>P</span>-
                </p>
                <button
                  onClick={handleShowShowTimes}
                  className='mt-4 flex max-w-fit cursor-pointer items-center justify-center bg-primary px-4 py-2 text-xl uppercase opacity-80 shadow-ct3d transition-all hover:opacity-100'
                >
                  <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' className='mr-2 h-6' />
                  {t('book-tickets')}
                </button>
              </div>
              <div className='col-span-12 my-[20px] bg-primary p-[20px] shadow-ct3d'>
                <p className='text-base text-white'>{product.description}</p>
              </div>
            </div>
          </div>
          {!isHideShowTimes && (
            <div className='col-span-12 my-[20px] p-[15px] text-white'>
              <div className='mb-[20px] flex flex-wrap items-center justify-between'>
                <p className='mb-[20px] max-w-fit border-b-2 pb-2 pl-2 pr-12 text-left text-2xl font-bold'>
                  {t('showtimes')}
                </p>
                <DropdownCinema />
              </div>
              <div className='mb-[20px] max-w-fit bg-tertiary px-[20px] py-[8px] font-semibold'>
                {t('today')},{' '}
                {currentDate.toLocaleString(i18n.language, {
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className='mb-[12px] flex flex-wrap items-center justify-start'>
                <div
                  className={classNames('mb-[8px] mr-[8px] rounded-md border border-white px-[20px] py-[8px]', {
                    'cursor-not-allowed bg-quaternary': true,
                    'cursor-pointer bg-primary': false
                  })}
                >
                  13:15
                </div>
                <div
                  className={classNames('mb-[8px] mr-[8px] rounded-md border border-white px-[20px] py-[8px]', {
                    'cursor-not-allowed bg-quaternary': true,
                    'cursor-pointer bg-primary': false
                  })}
                >
                  13:35
                </div>
              </div>
              <div className='mb-[20px] max-w-fit bg-tertiary px-[20px] py-[8px] font-semibold'>
                {tomorrow.toLocaleString(i18n.language, {
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </div>
              <div className='mb-[12px] flex flex-wrap items-center justify-start'>
                <Link
                  to={path.bookTickets}
                  className={classNames('mb-[8px] mr-[8px] rounded-md border border-white px-[20px] py-[8px]', {
                    'cursor-not-allowed bg-quaternary': false,
                    'cursor-pointer bg-primary': true
                  })}
                >
                  13:35
                </Link>
                <Link
                  to={path.bookTickets}
                  className={classNames('mb-[8px] mr-[8px] rounded-md border border-white px-[20px] py-[8px]', {
                    'cursor-not-allowed bg-quaternary': false,
                    'cursor-pointer bg-primary': true
                  })}
                >
                  15:15
                </Link>
              </div>
            </div>
          )}
        </div>
        <VideoPopup isOpen={isVideoOpen} videoUrl={product.trailer} onClose={closeVideoPopup} />
      </div>
    </div>
  )
}
