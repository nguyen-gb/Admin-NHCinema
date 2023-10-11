// eslint-disable-next-line import/no-unresolved
import Modal from 'react-modal'
import ReactPlayer from 'react-player'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

interface Props {
  isOpen: boolean
  videoUrl: string
  onClose: () => void
}

export default function VideoPopup({ isOpen, videoUrl, onClose }: Props) {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsReady(isOpen)
    }, 200)

    return () => {
      setIsReady(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsReady(false)

    setTimeout(() => {
      onClose()
    }, 800)
  }
  return (
    <Modal ariaHideApp={false} isOpen={isOpen} className='flex h-full w-full items-center justify-center bg-black/90'>
      <div
        className={classNames('relative transform transition-all duration-1000 sm:min-w-[600px] lg:min-w-[800px]', {
          'translate-y-[-150px] opacity-0': !isReady,
          'translate-y-0 opacity-100': isReady
        })}
      >
        <ReactPlayer width='100%' url={videoUrl} controls />
        <button className='absolute right-[-1rem] top-[-1rem] text-primary' onClick={handleClose}>
          <AiOutlineCloseCircle className='h-8 w-8' />
        </button>
      </div>
    </Modal>
  )
}
