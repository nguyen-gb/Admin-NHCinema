import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
// import { useQuery } from '@tanstack/react-query'
// import classNames from 'classnames'
// import { Link, createSearchParams } from 'react-router-dom'

// import { purchasesStatus } from 'src/constants/purchase'
// import purchaseApi from 'src/apis/purchase.api'
// import path from 'src/constants/path'
// import useQueryParams from 'src/hooks/useQueryParams'
// import { PurchaseListStatus } from 'src/types/purchase.type'
// import { formatCurrency, generateNameId } from 'src/utils/utils'

// const purchaseTabs = [
//   { status: purchasesStatus.all, name: 'Tất cả' },
//   { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
//   { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
//   { status: purchasesStatus.inProgress, name: 'Đang giao' },
//   { status: purchasesStatus.delivered, name: 'Đã giao' },
//   { status: purchasesStatus.cancelled, name: 'Đã huỷ' }
// ]

export default function BonusPoints() {
  const { t } = useTranslation('user')
  // const queryParams: { status?: string } = useQueryParams()
  // const status: number = Number(queryParams.status) || purchasesStatus.all

  // const { data: purchasesData } = useQuery({
  //   queryKey: ['purchases', { status }],
  //   queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  // })

  // const purchases = purchasesData?.data.data

  // const purchaseTabsLink = purchaseTabs.map((tab) => (
  //   <Link
  //     key={tab.status}
  //     to={{
  //       pathname: path.historyPurchase,
  //       search: createSearchParams({
  //         status: String(tab.status)
  //       }).toString()
  //     }}
  //     className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
  //       'border-b-primary text-primary': status === tab.status,
  //       'border-b-black/10 text-gray-900': status !== tab.status
  //     })}
  //   >
  //     {tab.name}
  //   </Link>
  // ))
  return (
    <div>
      <Helmet>
        <title>{t('bonus-points')} | NHCinema</title>
        <meta name='description' content={t('bonus-points-des')} />
      </Helmet>
      <div className='container text-white'>
        <div className='my-[40px]'>
          <div className='mt-10'>
            <div className='mt-4 ring-1 ring-gray-700 sm:mx-0 sm:rounded-xl'>
              <table className='min-w-full divide-y divide-gray-700'>
                <thead>
                  <tr>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('day-trading')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('transaction-type')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('trading-name')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('score')}
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div className='py-10 text-center text-sm text-gray-500'>{t('no-data')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
