import range from 'lodash/range'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const { i18n } = useTranslation()
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='flex flex-col flex-wrap text-quaternary sm:flex-row md:mt-6'>
      {/* <div className='truncate pt-3 capitalize sm:w-[20%] md:text-right'>Ngày sinh</div> */}
      <div className='w-[100%]'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='date'
            value={value?.getDate() || date.date}
            className='h-10 w-[32%] cursor-pointer rounded-[10px] border border-black/10 px-3 hover:border-primary'
          >
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='month'
            value={value?.getMonth() || date.month}
            className='h-10 w-[32%] cursor-pointer rounded-[10px] border border-black/10 px-3 hover:border-primary'
          >
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {new Date(0, item).toLocaleString(i18n.language, { month: 'long' })}
              </option>
            ))}
          </select>

          <select
            onChange={handleChange}
            name='year'
            value={value?.getFullYear() || date.year}
            className='h-10 w-[32%] cursor-pointer rounded-[10px] border border-black/10 px-3 hover:border-primary'
          >
            {range(1990, 2024).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-primary'>{errorMessage}</div>
      </div>
    </div>
  )
}
