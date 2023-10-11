import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { seatArray } from 'src/constants/product'
import Combo from 'src/components/Combo'
import path from 'src/constants/path'

interface SeatProps {
  isReserved: boolean
  isSelected: boolean
  onSelect: () => void
  isDoubleSeat?: boolean
  SeatNumber: number
}

const Seat: React.FC<SeatProps> = ({ isReserved, isSelected, onSelect, isDoubleSeat = false, SeatNumber }) => {
  const seatClasses = `${isDoubleSeat ? 'w-24 mx-4' : 'w-[2.5rem]'} h-[2.5rem] m-1 rounded-md text-white ${
    isReserved
      ? 'bg-red-500 cursor-not-allowed'
      : isSelected
      ? 'bg-primary'
      : `${isDoubleSeat ? 'bg-tertiary/80 hover:bg-tertiary' : 'bg-[#252a31] hover:bg-[#374151] cursor-pointer'}`
  }`

  return (
    <button
      className={seatClasses}
      onClick={() => {
        if (!isReserved) {
          onSelect()
        }
      }}
    >
      {seatArray[SeatNumber - 1]}
    </button>
  )
}

interface Item {
  id: string
  image: string
  name: string
  price: string | number
  quantity: number
}

const mockData: Item[] = [
  {
    id: '1',
    image: 'https://touchcinema.com/medias/l-poster.PNG',
    name: '1 Bắp rang bơ, 1 Pepsi',
    price: '67.000đ',
    quantity: 99
  },
  {
    id: '2',
    image: 'https://touchcinema.com/medias/l-poster.PNG',
    name: '1 Bắp rang bơ, 1 Pepsi',
    price: '67.000đ',
    quantity: 99
  },
  {
    id: '3',
    image: 'https://touchcinema.com/medias/l-poster.PNG',
    name: '1 Bắp rang bơ, 1 Pepsi',
    price: '67.000đ',
    quantity: 99
  }
]

const BookTickets: React.FC = () => {
  const { t } = useTranslation('book-tickets')
  const navigate = useNavigate()
  const rows = 9
  const cols = 9
  const totalSeats = rows * cols
  const [selectedSeats, setSelectedSeats] = useState<{ SeatNumber: number }[]>([])
  const [combo, setCombo] = useState<Item[]>([])
  const reservedSeats = [
    {
      SeatNumber: 49
    },
    {
      SeatNumber: 50
    }
  ]

  const toggleSeat = (SeatNumber: number) => {
    const seatIndex = selectedSeats.findIndex((s) => s.SeatNumber === SeatNumber)

    if (seatIndex === -1) {
      setSelectedSeats([...selectedSeats, { SeatNumber }])
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s.SeatNumber !== SeatNumber))
    }
  }

  const handlePayment = () => {
    navigate({
      pathname: path.payment
    })
  }

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('book-tickets')} | NHCinema</title>
        <meta name='description' content={t('book-tickets-des')} />
      </Helmet>
      <div className='container'>
        <div className='mb-[40px]'>
          <div className='flex flex-col items-center justify-center'>
            <div className='max-w-fit'>
              <img
                src='https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fscreen.png&w=1920&q=75'
                alt=''
                className='h-full w-full object-cover'
              />
              <div className='mb-6 text-center text-lg font-bold text-white'>{t('screening-room-number')} 2</div>
            </div>
            <div className='flex flex-wrap items-start justify-center gap-2'>
              <div className='flex flex-col items-center justify-center'>
                {Array.from({ length: rows }, (_, rowIndex) => (
                  <div key={rowIndex} className='flex'>
                    {Array.from({ length: cols }, (_, colIndex) => {
                      const SeatNumber = rowIndex * cols + colIndex + 1
                      return (
                        <Seat
                          key={colIndex}
                          isReserved={reservedSeats.some((s) => s.SeatNumber === SeatNumber)}
                          isSelected={selectedSeats.some((s) => s.SeatNumber === SeatNumber)}
                          onSelect={() => toggleSeat(SeatNumber)}
                          SeatNumber={SeatNumber}
                        />
                      )
                    })}
                  </div>
                ))}
                <div className='mt-4 flex'>
                  {Array.from({ length: 3 }, (_, index) => {
                    const SeatNumber = totalSeats + index + 1
                    return (
                      <Seat
                        key={index}
                        isReserved={reservedSeats.some((s) => s.SeatNumber === SeatNumber)}
                        isSelected={selectedSeats.some((s) => s.SeatNumber === SeatNumber)}
                        onSelect={() => toggleSeat(SeatNumber)}
                        isDoubleSeat={true}
                        SeatNumber={SeatNumber}
                      />
                    )
                  })}
                </div>
                <div className='my-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white md:text-base xl:gap-8'>
                  <div className='flex items-center gap-2'>
                    <div className='flex aspect-square w-4 items-center justify-center rounded-[4px] bg-red-500 sm:w-6 xl:h-8 xl:w-8 xl:rounded-[8px]'></div>
                    {t('booked')}
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='flex aspect-square w-4 items-center justify-center rounded-[4px] bg-primary sm:w-6 xl:h-8 xl:w-8 xl:rounded-[8px]'></div>
                    {t('chair-of-your-choice')}
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='flex aspect-square w-4 items-center justify-center rounded-[4px] bg-[#252A31] sm:w-6 xl:h-8 xl:w-8 xl:rounded-[8px]'></div>
                    {t('regular-chair')}
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='flex aspect-square w-4 items-center justify-center rounded-[4px] bg-tertiary/80 sm:w-6 xl:h-8 xl:w-8 xl:rounded-[8px]'></div>
                    {t('double-chair')}
                  </div>
                </div>
              </div>
              <div className='m-1'>
                <div>
                  <Combo type='Combo' items={mockData} setCombo={setCombo} />
                </div>
                <div>
                  <Combo type='Combo' items={mockData} setCombo={setCombo} />
                </div>
                <div>
                  <Combo type='Combo' items={mockData} setCombo={setCombo} />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-8 flex w-full flex-wrap items-center justify-between gap-y-4 text-white'>
            <div>
              <p className='mb-2'>
                {t('selected-seats')}:{' '}
                <span className='font-semibold'>
                  {selectedSeats.map((s) => seatArray[s.SeatNumber - 1]).join(', ')}
                </span>
              </p>
              <p className='mb-2'>
                {t('selected-combo')}:{' '}
                <span className='font-semibold'>
                  {combo.map((c) => `${c.name} (Số lượng: ${c.quantity})`).join(', ')}
                </span>
              </p>
              <p>
                {t('total-amount')}: <span className='font-semibold'>0{t('vnd')}</span>
              </p>
            </div>
            <div className='flex w-full items-center justify-center gap-2 xl:w-auto'>
              <Link
                to={path.showtimes}
                className='inline-flex h-10 items-center justify-center rounded-full border bg-transparent px-8 py-2 text-sm font-medium transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
              >
                {t('back')}
              </Link>
              <button
                onClick={handlePayment}
                disabled={Boolean(!selectedSeats.length)}
                className='inline-flex h-10 items-center justify-center rounded-full bg-primary px-8 py-2 text-sm font-medium transition duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
              >
                {t('payment')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookTickets
