import React from 'react'
import { Button, Modal } from 'antd'
import { useTranslation } from 'react-i18next'

interface Props {
  open: boolean
  setIsOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: () => void
  isLoadingDelete?: boolean
  countItem?: number
}

export default function ModalDelete({ onDelete, open, setIsOpenDeleteModal, isLoadingDelete, countItem }: Props) {
  const { t } = useTranslation('general')

  const handleDelete = () => {
    onDelete()
  }

  return (
    <Modal
      title={t('delete')}
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
          loading={isLoadingDelete}
        >
          {t('delete')}
        </Button>
      ]}
    >
      {countItem ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>{`${t('delete-confirm-multi')} ${countItem} ${t(
          'row'
        )}?`}</div>
      ) : (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>{t('delete-confirm')}</div>
      )}
    </Modal>
  )
}
