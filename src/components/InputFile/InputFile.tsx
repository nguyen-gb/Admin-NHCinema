import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if ((fileFromLocal && fileFromLocal.size >= config.maxSizeUploadAvatar) || !fileFromLocal?.type.includes('image')) {
      toast.error('Dụng lượng file tối đa 1 MB và định dạng phải là:.JPEG, .PNG')
    } else {
      onChange && onChange(fileFromLocal)
    }
  }
  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      ></input>
      <button
        onClick={handleUpload}
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}
