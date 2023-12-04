import { useState } from 'react'
import { Table, Button, Card, Space, Divider, Input, Tooltip } from 'antd'
import * as Icon from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import ticketApi from 'src/apis/ticket.api'
import { seatArray } from 'src/constants/seat'

export const TicketPage = () => {
  // hook
  const { t } = useTranslation('ticket')

  // query api
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [keyword, setKeyword] = useState('')

  const queryConfig = {
    page: currentPage,
    page_size: pageSize,
    key_search: keyword
  }

  const { data, isLoading } = useQuery({
    queryKey: ['ticket', queryConfig],
    queryFn: () => ticketApi.getTickets(queryConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataTable = data?.data.data
  const total = data?.data.total_record

  // state
  // const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  // const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  // const [isOpenDeleteMultiModal, setIsOpenDeleteMultiModal] = useState<boolean>(false)
  // const [formData, setFormData] = useState<Ticket>()
  // const [idDelete, setIdDelete] = useState<string>('')
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [keywordInput, setKeywordInput] = useState('')

  // handle action
  const resetParamsAndRefresh = () => {
    setCurrentPage(1)
    setPageSize(20)
    setKeyword('')
    setKeywordInput('')
  }

  return (
    <Card title={t('ticket')}>
      <Space wrap>
        <Input.Search
          placeholder={t('search')}
          onSearch={() => {
            setCurrentPage(1)
            setKeyword(keywordInput)
          }}
          value={keywordInput}
          onChange={(event) => {
            setKeywordInput(event.target.value)
          }}
        />
        <Button
          type='primary'
          loading={isLoading}
          icon={<Icon.ReloadOutlined />}
          onClick={resetParamsAndRefresh}
        ></Button>
      </Space>
      <Divider />
      <Table
        rowKey='_id'
        scroll={{ x: 1080 }}
        loading={isLoading}
        // rowSelection={{
        //   selectedRowKeys: selectedRowKeys,
        //   onChange: setSelectedRowKeys
        // }}
        dataSource={dataTable}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange(page, pageSize) {
            setCurrentPage(page)
            setPageSize(pageSize)
          }
        }}
        columns={[
          {
            title: '#',
            dataIndex: 'id',
            width: '7%',
            render: (_, __, index) => index + 1
          },
          {
            title: t('name'),
            dataIndex: 'name',
            render: (_, ticket) => ticket.user_name
          },
          {
            title: t('movie'),
            dataIndex: 'movie_name',
            render: (_, ticket) => ticket.movie_name
          },
          {
            title: t('showtime'),
            dataIndex: ['time', 'showtime'],
            render: (_, ticket) => `${ticket.showtime} ${ticket.time}`
          },
          {
            title: t('room'),
            dataIndex: 'room_number',
            render: (_, ticket) => ticket.room_number
          },
          {
            title: t('seat'),
            dataIndex: 'seat',
            render: (_, ticket) => ticket.seats.map((seat) => seatArray[Number(seat.seat_number) - 1]).join(', ')
          },
          {
            title: t('action'),
            align: 'right',
            render: () => (
              <Space direction='horizontal'>
                <Tooltip title={<div>{t('view')}</div>}>
                  <Button loading={false} size='middle' icon={<Icon.EyeOutlined />}></Button>
                </Tooltip>
              </Space>
            )
          }
        ]}
      />
    </Card>
  )
}
