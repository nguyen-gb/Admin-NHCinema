import { Button, Divider, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

interface Props {
  countItem: number
  setIsOpenDeleteMultiModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteNav({ countItem, setIsOpenDeleteMultiModal }: Props) {
  const { t } = useTranslation('general')

  return (
    <>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px solid #1677ff',
          padding: '12px 24px',
          background: '#E9F7FE'
        }}
      >
        <Typography.Text>{`${t('select')} ${countItem} ${t('row')}`}</Typography.Text>
        <Button
          type='primary'
          style={{ border: 'none', color: 'red' }}
          ghost
          onClick={() => setIsOpenDeleteMultiModal(true)}
        >
          {t('delete')}
        </Button>
      </Space>
      <Divider />
    </>
  )
}
