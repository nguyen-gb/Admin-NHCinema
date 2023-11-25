import { Button, Divider, Space, Typography } from 'antd'

interface Props {
  countItem: number
  setIsOpenDeleteMultiModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteNav({ countItem, setIsOpenDeleteMultiModal }: Props) {
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
        <Typography.Text>{`Select ${countItem} items`}</Typography.Text>
        <Button
          type='primary'
          style={{ border: 'none', color: 'red' }}
          ghost
          onClick={() => setIsOpenDeleteMultiModal(true)}
        >
          Delete
        </Button>
      </Space>
      <Divider />
    </>
  )
}
