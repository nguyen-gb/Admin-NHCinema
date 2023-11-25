import React, { useState } from 'react'
import { Table, Button, Card, Space, Divider, Input, Tooltip } from 'antd'
import * as Icon from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import DeleteNav from './components/DeleteNav'
import ModalDelete from './components/DeleteModel'
import { PopupForm } from './components/PopupForm'
import roomApi from 'src/apis/room.api'
import { Room } from 'src/types/room.type'
import { ErrorResponse } from 'src/types/utils.type'

export const RoomPage = () => {
  // hook

  // query api
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [keyword, setKeyword] = useState('')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['room'],
    queryFn: roomApi.getRooms
  })
  const dataTable = data?.data.data

  const deleteRoom = useMutation({
    mutationKey: ['room'],
    mutationFn: (body: string[]) => roomApi.deleteRoom(body)
  })

  // state
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isOpenDeleteMultiModal, setIsOpenDeleteMultiModal] = useState<boolean>(false)
  const [formData, setFormData] = useState<Room>()
  const [idDelete, setIdDelete] = useState<string>('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [keywordInput, setKeywordInput] = useState('')

  // handle action
  const resetParamsAndRefresh = () => {
    setCurrentPage(1)
    setPageSize(20)
    setKeyword('')
    setKeywordInput('')
  }
  //update
  const handleUpdate = (room: Room) => {
    setFormData(room)
    handleOpenModal()
  }
  //delete
  const handleOnClickDelete = (id: string) => {
    setIdDelete(id)
    setIsOpenDeleteModal(true)
  }
  const handleDeleteRoom = (isDeleMore: boolean) => {
    const body = isDeleMore ? selectedRowKeys : [idDelete]
    deleteRoom.mutate(body as string[], {
      onSuccess: () => {
        toast.success('Delete thành công')

        if (isDeleMore) {
          setIsOpenDeleteMultiModal(false)
          setSelectedRowKeys([])
        } else {
          setIsOpenDeleteModal(false)
          setIdDelete('')
        }

        refetch()
      },
      onError: (error) => {
        toast.error((error as ErrorResponse<any>).message)
      }
    })
  }

  //handle modal
  const handleOpenModal = () => {
    setIsOpenModal(true)
  }
  const handleCloseModal = () => {
    setIsOpenModal(false)
    setFormData(undefined)
    refetch()
  }

  return (
    <Card
      title='Room'
      extra={
        <Space>
          <Button type='primary' size='middle' icon={<Icon.PlusOutlined />} onClick={handleOpenModal}>
            Add new
          </Button>
        </Space>
      }
    >
      <Space wrap>
        <Input.Search
          placeholder='Search'
          onSearch={() => {
            setCurrentPage(1)
            setKeyword(keywordInput)
          }}
          value={keywordInput}
          onChange={(event) => {
            setKeywordInput(event.target.value)
          }}
        />
      </Space>
      <Divider />
      {selectedRowKeys.length > 0 && (
        <DeleteNav countItem={selectedRowKeys.length} setIsOpenDeleteMultiModal={setIsOpenDeleteMultiModal} />
      )}
      <Table
        rowKey='_id'
        scroll={{ x: 1080 }}
        loading={isLoading}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: setSelectedRowKeys
        }}
        dataSource={dataTable}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: 20,
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
            title: 'Name',
            dataIndex: 'name',
            render: (_, room) => room.room_number
          },
          {
            title: 'Action',
            align: 'right',
            render: (_, room) => (
              <Space direction='horizontal'>
                <Tooltip title={<div>Update</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    icon={<Icon.EditOutlined />}
                    onClick={() => handleUpdate(room)}
                  ></Button>
                </Tooltip>
                <Tooltip title={<div>Delete</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    danger={true}
                    icon={<Icon.DeleteOutlined />}
                    onClick={() => handleOnClickDelete(room._id)}
                  ></Button>
                </Tooltip>
              </Space>
            )
          }
        ]}
      />

      <PopupForm
        key={formData?._id}
        title={formData ? 'Update' : 'Add new'}
        open={isOpenModal}
        formData={formData}
        onCancel={handleCloseModal}
        onDone={handleCloseModal}
        formType={formData ? 'UPDATE' : 'CREATE'}
      />
      <ModalDelete
        open={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        onDelete={() => handleDeleteRoom(false)}
      />
      <ModalDelete
        open={isOpenDeleteMultiModal}
        setIsOpenDeleteModal={setIsOpenDeleteMultiModal}
        onDelete={() => handleDeleteRoom(true)}
        countItem={selectedRowKeys.length}
      />
    </Card>
  )
}
