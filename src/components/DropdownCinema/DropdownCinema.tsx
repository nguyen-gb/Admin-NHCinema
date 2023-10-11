import { useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { AppContext } from 'src/contexts/app.context'
import cinemaApi from 'src/apis/cinema.api'

export default function DropdownCinema() {
  const { cinema, setCinema } = useContext(AppContext)
  const { data: cinemaData } = useQuery({
    queryKey: ['cinema'],
    queryFn: cinemaApi.getCinemas
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectCinema = (event: any) => {
    const selectedCinema = cinemaData?.data.data[event.target.value]
    selectedCinema && setCinema(selectedCinema)
  }

  useEffect(() => {
    cinemaData && setCinema(cinemaData.data.data[0])
  }, [cinemaData, setCinema])

  return (
    <div className='group relative mb-[20px] inline-block text-left'>
      <div className='min-w-[200px]'>
        <span className='rounded-md shadow-sm'>
          <button
            type='button'
            className='inline-flex w-full justify-center rounded-md bg-primary px-6 py-3 text-white'
          >
            {cinema.name}
          </button>
        </span>
      </div>
      <div className='absolute right-0 mt-[1px] hidden min-w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block'>
        <div className='py-1'>
          {cinemaData?.data.data.map((cinema, index) => (
            <button
              key={cinema._id}
              onClick={handleSelectCinema}
              value={index}
              className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-quaternary'
            >
              {cinema.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
