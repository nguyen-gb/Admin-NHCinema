import React from 'react'
import { Button, Modal } from 'antd'

interface Props {
  open: boolean
  setIsOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: () => void
  isLoadingDelete?: boolean
  countItem?: number
}

export default function ModalDelete({ onDelete, open, setIsOpenDeleteModal, isLoadingDelete, countItem }: Props) {
  const handleDelete = () => {
    onDelete()
  }

  return (
    <Modal
      title='Delete'
      confirmLoading={false}
      forceRender
      open={open}
      onCancel={() => setIsOpenDeleteModal(false)}
      centered={true}
      width={600}
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
      footer={[
        <Button
          key='submit'
          type='primary'
          onClick={handleDelete}
          style={{ width: '100%', marginTop: '0px' }}
          disabled={isLoadingDelete}
        >
          Delete
        </Button>
      ]}
    >
      {countItem ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>{`Bạn có chắc chắn muốn xoá ${countItem} hàng?`}</div>
      ) : (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>Bạn có chắc chắn muốn xoá?</div>
      )}
    </Modal>
  )
}
