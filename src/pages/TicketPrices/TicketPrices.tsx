import classNames from 'classnames'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export default function TicketPrices() {
  const { t } = useTranslation('fare')
  const [is2D, setIs2D] = useState(true)
  const [is3D, setIs3D] = useState(false)
  const [isHoliday, setIsHoliday] = useState(false)

  const handleChangeType = (type: number) => {
    if (type === 2) {
      setIs2D(false)
      setIs3D(true)
      setIsHoliday(false)
    } else if (type === 3) {
      setIs2D(false)
      setIs3D(false)
      setIsHoliday(true)
    } else {
      setIs2D(true)
      setIs3D(false)
      setIsHoliday(false)
    }
  }

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('ticket-prices')} | NHCinema</title>
        <meta name='description' content={t('ticket-prices-des')} />
      </Helmet>
      <div className='container'>
        <div className='flex flex-col justify-start bg-white/95 p-[20px] transition-all'>
          <div className='mb-[10px] text-lg uppercase text-primary'>{t('ticket-cinema')}</div>
          <div className='flex items-end justify-start transition-all'>
            <button
              onClick={() => handleChangeType(1)}
              className={classNames('mr-1 cursor-pointer rounded-md px-6 text-xl uppercase text-white transition-all', {
                'bg-primary py-4': is2D,
                'bg-tertiary py-2': !is2D
              })}
            >
              {t('2D-ticket-price')}
            </button>
            <button
              onClick={() => handleChangeType(2)}
              className={classNames('mr-1 cursor-pointer rounded-md px-6 text-xl uppercase text-white transition-all', {
                'bg-primary py-4': is3D,
                'bg-tertiary py-2': !is3D
              })}
            >
              {t('3D-ticket-price')}
            </button>
            <button
              onClick={() => handleChangeType(3)}
              className={classNames(
                'mr-1 cursor-pointer rounded-md px-6  text-xl uppercase text-white transition-all',
                {
                  'bg-primary py-4': isHoliday,
                  'bg-tertiary py-2': !isHoliday
                }
              )}
            >
              {t('holiday')}
            </button>
          </div>
          <div className='my-2 h-[1px] w-full bg-gradient-to-r from-primary to-tertiary'></div>
          {is2D && (
            <>
              <div className='mb-4 w-full'>
                <img
                  src='https://touchcinema.com/storage/slider-tv/z4045880677164-1ba77b4619d45e773581092b6319ac62.jpg'
                  alt=''
                  className='w-full object-cover'
                />
              </div>
              <div className='text-base'>
                <p className='mb-2'>
                  <strong>{t('note')}:</strong>
                </p>
                <p className='mb-2'>{t('fare-1')}</p>
                <p className='mb-2'>{t('fare-2')}</p>
                <p className='mb-2'>{t('fare-3')}</p>
                <p className='mb-2'>{t('fare-4')}</p>
                <p className='mb-2'>{t('fare-5')}</p>
                <p className='mb-2'>{t('fare-6')}</p>
                <p className='mb-2'>{t('fare-7')}</p>
              </div>
            </>
          )}
          {is3D && (
            <>
              <div className='mb-4 w-full'>
                <img
                  src='https://touchcinema.com/storage/slide-web/z3998808944858-ecbdc76834918b00c5fd6f4a796926dd.jpg'
                  alt=''
                  className='w-full object-cover'
                />
              </div>
              <div className='text-base'>
                <ul>
                  <li className='mb-2'>{t('fare-8')}</li>
                  <li className='mb-2'>{t('fare-9')}</li>
                </ul>
              </div>
            </>
          )}
          {isHoliday && (
            <>
              <div className='mb-4 w-full'>
                <img
                  src='https://touchcinema.com/storage/slide-web/z4103264955341-3bb1395fb3108359cda4af45aee336f4.jpg'
                  alt=''
                  className='w-full object-cover'
                />
              </div>
              <div className='text-base'>
                <p className='mb-2'>
                  <strong>{t('note')}: </strong>
                </p>
                <p className='mb-2'>{t('fare-10')}</p>
                <p className='mb-2'>{t('fare-11')}</p>
                <p className='mb-2'>{t('fare-12')}</p>
                <p className='mb-2'>{t('fare-13')}</p>
                <p className='mb-2'>{t('fare-14')}</p>
                <p className='mb-2'>{t('fare-15')}</p>
                <p className='mb-2'>{t('fare-16')}</p>
                <p className='mb-2'>{t('fare-17')}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
