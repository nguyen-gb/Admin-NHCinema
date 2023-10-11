import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// import { useContext } from 'react'

import Popover from '../Popover'
import path from 'src/constants/path'
// import { AppContext } from 'src/contexts/app.context'

export default function Notification() {
  const { t } = useTranslation()
  // const { isAuthenticated } = useContext(AppContext)
  // const { data: notificationsData } = useQuery({
  //   queryKey: ['purchases', { status: purchasesStatus.inCart }],
  //   queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
  //   enabled: isAuthenticated
  // })

  const notifications = [1, 2, 3, 4, 5]
  return (
    <Popover
      renderPopover={
        <div className='max-w-[300px] rounded-sm border border-gray-200 bg-white text-sm shadow-md md:max-w-[400px]'>
          {notifications && notifications.length > 0 ? (
            <div>
              <div className='border-b-[1px] border-quaternary/20 p-2 capitalize text-quaternary'>
                {t('notification')}
              </div>
              <div className='max-h-[500px] overflow-y-auto'>
                {notifications.map((notification) => (
                  <Link
                    to={path.home}
                    className='group block border-b-[1px] border-quaternary/20 p-2 text-[12px] text-quaternary'
                    key={notification}
                  >
                    <b className='transition-all group-hover:text-primary'>🦀 Nhà Bà Nữ - Bánh canh cua đủ vị</b>
                    <p className='line-clamp-2'>
                      Đến Touch Cinema ”book” ngay món bánh canh cua Nhà Bà Nữ. Đồng cảm với những hoài bão, khát vọng
                      và cả sự nông nổi của tuổi trẻ… 🥰
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className='z-10 flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
              <div className='mt-3 capitalize text-quaternary'>Không có thông báo</div>
            </div>
          )}
        </div>
      }
    >
      <div className='relative'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-8 w-8 text-primary'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
          />
        </svg>

        {notifications && notifications.length > 0 && (
          <span className='absolute right-[-9px] top-[-5px] rounded-full bg-white px-[9px] py-[1px] text-xs text-primary'>
            {notifications?.length}
          </span>
        )}
      </div>
    </Popover>
  )
}
