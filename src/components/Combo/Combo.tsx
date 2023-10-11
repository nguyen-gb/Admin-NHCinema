import classNames from 'classnames'
import { useState } from 'react'

interface Item {
  id: string
  image: string
  name: string
  price: string | number
  quantity: number
}

interface PropsItemCombo {
  item: Item
  setCombo: React.Dispatch<React.SetStateAction<Item[]>>
}

interface PropsCombo {
  type: string
  items: Item[]
  setCombo: React.Dispatch<React.SetStateAction<Item[]>>
}

const ItemCombo = ({ item, setCombo }: PropsItemCombo) => {
  const [quantity, setQuantity] = useState(0)

  const handleAddCombo = (item: Item) => {
    setQuantity((pre) => {
      if (pre < item.quantity) {
        return pre + 1
      }
      return pre
    })
    setCombo((pre) => {
      const existsInArray = pre.some((combo) => combo.id === item.id)
      if (existsInArray) {
        return pre.map((combo) => {
          if (item.id === combo.id) {
            return {
              ...combo,
              quantity: combo.quantity + 1
            }
          }
          return combo
        })
      } else {
        return [
          ...pre,
          {
            ...item,
            quantity: 1
          }
        ]
      }
    })
  }

  const handleRemoveCombo = (item: Item) => {
    setQuantity((pre) => {
      if (pre > 0) {
        return pre - 1
      }
      return pre
    })
    setCombo((pre) => {
      const existsInArray = pre.some((combo) => combo.id === item.id && combo.quantity > 1)
      if (existsInArray) {
        return pre.map((combo) => {
          if (item.id === combo.id) {
            return {
              ...combo,
              quantity: combo.quantity - 1
            }
          }
          return combo
        })
      } else {
        return pre.filter((combo) => item.id !== combo.id)
      }
    })
  }
  return (
    <div className='flex w-full items-center px-4 py-2'>
      <img src={item.image} alt={item.name} className='h-8 w-8 rounded-full object-cover' />
      <div className='ml-3 flex-1'>
        <div className='text-base font-medium text-white'>{item.name}</div>
        <div className='text-base text-primary'>{item.price}</div>
      </div>
      <div className='ml-4 flex space-x-4'>
        <button
          type='button'
          className='rounded-sm bg-primary text-white'
          onClick={() => {
            handleRemoveCombo(item)
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
          </svg>
        </button>
        <span className='font-bold text-white'>{quantity}</span>
        <button type='button' className='rounded-sm bg-primary text-white' onClick={() => handleAddCombo(item)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
      </div>
    </div>
  )
}

const Combo = ({ type, items, setCombo }: PropsCombo) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative mb-2 inline-block w-full text-left'>
      <button
        onClick={toggleDropdown}
        type='button'
        className='inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-[#1A1D23] px-4 py-2 text-sm font-medium text-white hover:bg-[#374151] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        id='menu-button'
        aria-expanded='true'
        aria-haspopup='true'
      >
        {type}
        <svg
          className='-mr-1 ml-2 h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <div
        className={classNames(
          `mt-2 w-full origin-top-right overflow-hidden rounded-md bg-[#1A1D23] shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-1000 ease-in-out`,
          {
            'max-h-0': !isOpen,
            'max-h-[700px]': isOpen
          }
        )}
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='menu-button'
      >
        <div className='w-full py-1' role='none'>
          {items.map((item) => (
            <ItemCombo key={item.id} item={item} setCombo={setCombo} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Combo
