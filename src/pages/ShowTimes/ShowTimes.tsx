import classNames from 'classnames'
import { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AiFillStar } from 'react-icons/ai'
import { BiCategory, BiTime, BiUser } from 'react-icons/bi'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import DropdownCinema from 'src/components/DropdownCinema'
import { AppContext } from 'src/contexts/app.context'
import showtimesApi from 'src/apis/showtimes.api'
import { formatDateToString } from 'src/utils/utils'
import path from 'src/constants/path'

export default function ShowTimes() {
  const { cinema } = useContext(AppContext)
  const { i18n, t } = useTranslation('show-times')
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date())
  const [isToday, setIsToday] = useState(true)
  const [isTomorrow, setIsTomorrow] = useState(false)
  const [isDayAfterTomorrow, setIsDayAfterTomorrow] = useState(false)

  const currentDate = new Date()
  const currentHour = currentDate.getHours()
  const currentMinute = currentDate.getMinutes()
  const tomorrow = new Date(currentDate)
  tomorrow.setDate(currentDate.getDate() + 1)
  const dayAfterTomorrow = new Date(currentDate)
  dayAfterTomorrow.setDate(currentDate.getDate() + 2)

  const { data, isLoading } = useQuery({
    queryKey: ['showtimes', date, cinema],
    queryFn: () => showtimesApi.getShowtimesByDate({ theater_id: cinema._id, time: formatDateToString(date) })
  })

  const handleChangeDay = (day: Date) => {
    if (day === tomorrow) {
      setIsToday(false)
      setIsTomorrow(true)
      setIsDayAfterTomorrow(false)
    } else if (day === dayAfterTomorrow) {
      setIsToday(false)
      setIsTomorrow(false)
      setIsDayAfterTomorrow(true)
    } else {
      setIsToday(true)
      setIsTomorrow(false)
      setIsDayAfterTomorrow(false)
    }
    setDate(day)
  }

  const handleChooseTime = (movie_id: string, time: string) => {
    const config = {
      movie_id: movie_id,
      date: formatDateToString(date),
      time: time
    }
    navigate({
      pathname: path.bookTickets,
      search: createSearchParams(config).toString()
    })
  }

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('show-times')} | NHCinema</title>
        <meta name='description' content={t('show-times-des')} />
      </Helmet>
      <div className='container'>
        <div className='flex flex-col justify-start bg-white/95 p-[20px]'>
          <div className='flex flex-wrap items-center justify-between'>
            <p className='mb-[20px] max-w-fit text-left text-lg uppercase text-primary'>{t('schedule')}</p>
            <DropdownCinema />
          </div>
          <div className='mb-[20px] flex items-center justify-start overflow-x-auto shadow-inner shadow-quaternary'>
            <button
              onClick={() => handleChangeDay(currentDate)}
              className={classNames(
                'group m-[10px] flex flex-shrink-0 cursor-pointer flex-col items-center justify-between shadow-ct3d shadow-quaternary hover:text-white',
                {
                  'text-white': isToday,
                  'text-quaternary': isToday
                }
              )}
            >
              <div
                className={classNames('w-full px-8 py-[1px] text-lg group-hover:bg-primary', {
                  'bg-primary': isToday,
                  'bg-white': !isToday
                })}
              >
                {t('today')}
              </div>
              <div
                className={classNames('w-full px-6 py-2 group-hover:bg-secondary', {
                  'bg-secondary': isToday,
                  'bg-white': !isToday
                })}
              >
                <div className='text-center text-[50px] font-semibold'>{currentDate.getDate()}</div>
                <div className='text-center text-lg'>
                  {currentDate.toLocaleString(i18n.language, { month: 'long' })}
                </div>
              </div>
            </button>
            <button
              onClick={() => handleChangeDay(tomorrow)}
              className={classNames(
                'group m-[10px] flex flex-shrink-0 cursor-pointer flex-col items-center justify-between shadow-ct3d shadow-quaternary hover:text-white',
                {
                  'text-white': isTomorrow,
                  'text-quaternary': !isTomorrow
                }
              )}
            >
              <div
                className={classNames('w-full px-8 py-[1px] text-lg group-hover:bg-primary', {
                  'bg-primary': isTomorrow,
                  'bg-white': !isTomorrow
                })}
              >
                {tomorrow.toLocaleString(i18n.language, { weekday: 'long' })}
              </div>
              <div
                className={classNames('w-full px-6 py-2 group-hover:bg-secondary', {
                  'bg-secondary': isTomorrow,
                  'bg-white': !isTomorrow
                })}
              >
                <div className='text-center text-[50px] font-semibold'>{tomorrow.getDate()}</div>
                <div className='text-center text-lg'>{tomorrow.toLocaleString(i18n.language, { month: 'long' })}</div>
              </div>
            </button>
            <button
              onClick={() => handleChangeDay(dayAfterTomorrow)}
              className={classNames(
                'group m-[10px] flex flex-shrink-0 cursor-pointer flex-col items-center justify-between shadow-ct3d shadow-quaternary hover:text-white',
                {
                  'text-white': isDayAfterTomorrow,
                  'text-quaternary': !isDayAfterTomorrow
                }
              )}
            >
              <div
                className={classNames('w-full px-8 py-[1px] text-lg group-hover:bg-primary', {
                  'bg-primary': isDayAfterTomorrow,
                  'bg-white': !isDayAfterTomorrow
                })}
              >
                {dayAfterTomorrow.toLocaleString(i18n.language, { weekday: 'long' })}
              </div>
              <div
                className={classNames('w-full px-6 py-2 group-hover:bg-secondary', {
                  'bg-secondary': isDayAfterTomorrow,
                  'bg-white': !isDayAfterTomorrow
                })}
              >
                <div className='text-center text-[50px] font-semibold'>{dayAfterTomorrow.getDate()}</div>
                <div className='text-center text-lg'>
                  {dayAfterTomorrow.toLocaleString(i18n.language, { month: 'long' })}
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className='bg-tertiary p-[20px] text-lg uppercase text-white'>{t('movie-schedule')}</div>
        <div className='flex flex-col justify-start bg-white/95'>
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='relative m-3 flex justify-center bg-primary px-[20px] py-[10px] shadow-ct3d shadow-quaternary sm:justify-start'
              >
                <div
                  role='status'
                  className='animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0'
                >
                  <div className='flex h-48 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700 sm:w-96'>
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
                  <div className='w-full'>
                    <div className='mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                  </div>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            ))}
          {!isLoading &&
            data &&
            data.data.data.map((product) => (
              <div
                key={product._id}
                className='relative m-3 flex flex-wrap justify-center bg-primary px-[20px] py-[10px] shadow-ct3d shadow-quaternary sm:flex-nowrap'
              >
                <div className='mb-[20px] max-w-[220px] flex-shrink-0 shadow-ct3d shadow-quaternary sm:mb-0 sm:mr-[40px]'>
                  <img src={product.poster} alt={product.name} className='h-full w-full object-cover' />
                </div>
                <div className='flex-grow bg-white p-[20px]'>
                  <Link to=''>
                    <h3 className='text-xl uppercase text-quaternary'>{product.name}</h3>
                  </Link>
                  <h3 className='mb-[10px] text-base uppercase text-quaternary'>{product.english_name}</h3>
                  <div className='mb-[20px] hidden max-w-fit rounded-lg bg-secondary px-4 py-2 md:flex'>
                    <AiFillStar color='yellow' className='h-6 w-6' />
                    <AiFillStar color='yellow' className='h-6 w-6' />
                    <AiFillStar color='yellow' className='h-6 w-6' />
                    <AiFillStar color='yellow' className='h-6 w-6' />
                    <AiFillStar color='yellow' className='h-6 w-6' />
                  </div>
                  <div className='mb-[20px] hidden grid-cols-3 gap-4 md:grid'>
                    <span className='col-span-3 flex items-start lg:col-span-1'>
                      <strong className='mr-1 flex flex-shrink-0 items-center'>
                        <BiTime className='mx-1' />
                        {t('duration')}:
                      </strong>
                      {product.duration} {t('minutes')}
                    </span>
                    <span className='col-span-3 flex items-start lg:col-span-1'>
                      <strong className='mr-1 flex flex-shrink-0 items-center'>
                        <BiCategory className='mx-1' />
                        {t('genre')}:
                      </strong>
                      {product.genre}
                    </span>
                    <span className='col-span-3 flex items-start lg:col-span-1'>
                      <strong className='mr-1 flex flex-shrink-0 items-center'>
                        <BiUser className='mx-1' />
                        {t('director')}:
                      </strong>
                      {product.director}
                    </span>
                  </div>
                  <div className='flex flex-wrap text-white'>
                    {product.times.map((time) => {
                      const [hour, minute] = time.split(':').map(Number)
                      const isPastTime = hour < currentHour || (hour === currentHour && minute < currentMinute - 5)

                      return (
                        <button
                          onClick={() => handleChooseTime(product._id, time)}
                          key={time}
                          className={classNames(
                            'mb-[8px] mr-[8px] max-w-fit rounded-md border border-tertiary px-[20px] py-[8px]',
                            {
                              'cursor-not-allowed bg-quaternary': isPastTime,
                              'cursor-pointer bg-primary': !isPastTime
                            }
                          )}
                          disabled={!isPastTime}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className='absolute right-[100px] top-[-1px] hidden lg:block'>
                  <div className='max-h-fit rounded-sm bg-secondary px-3 pb-5 pt-4 text-center text-lg text-white shadow-ct3d shadow-quaternary'>
                    {product.age}
                  </div>
                </div>
                <div className='absolute right-[40px] top-[-1px] hidden lg:block'>
                  <div className='rounded-sm bg-tertiary px-3 py-4 text-center text-lg text-white shadow-ct3d shadow-quaternary'>
                    <p className='text-2xl font-semibold underline'>{product.release.substring(8, 10)}</p>
                    <p>{product.release.substring(5, 7)}</p>
                  </div>
                </div>
              </div>
            ))}
          {!isLoading && data && data?.data.data.length <= 0 && (
            <div className='p-10 text-center text-quaternary'>{t('no-data')}</div>
          )}
        </div>
      </div>
    </div>
  )
}
