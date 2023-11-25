import React, { useState } from 'react'
import { Table, Button, Card, Space, Divider, Input, Tooltip } from 'antd'
import * as Icon from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import DeleteNav from './components/DeleteNav'
import ModalDelete from './components/DeleteModel'
import { PopupForm } from './components/PopupForm'
import userApi from 'src/apis/user.api'
import { User } from 'src/types/user.type'
import { ErrorResponse } from 'src/types/utils.type'
import dayjs from 'dayjs'

export const UserPage = () => {
  // hook

  // query api
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [keyword, setKeyword] = useState('')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: userApi.getUsers
  })
  const dataTable = data?.data.data

  const deleteUser = useMutation({
    mutationKey: ['user'],
    mutationFn: (body: string[]) => userApi.deleteUser(body)
  })

  // state
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isOpenDeleteMultiModal, setIsOpenDeleteMultiModal] = useState<boolean>(false)
  const [formData, setFormData] = useState<User>()
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
  const handleUpdate = (user: User) => {
    setFormData(user)
    handleOpenModal()
  }
  //delete
  const handleOnClickDelete = (id: string) => {
    setIdDelete(id)
    setIsOpenDeleteModal(true)
  }
  const handleDeleteUser = (isDeleMore: boolean) => {
    const body = isDeleMore ? selectedRowKeys : [idDelete]
    deleteUser.mutate(body as string[], {
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
      title='User'
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
        // rowSelection={{
        //   selectedRowKeys: selectedRowKeys,
        //   onChange: setSelectedRowKeys
        // }}
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
            render: (_, user) => user.name
          },
          {
            title: 'Role',
            dataIndex: 'role',
            render: (_, user) => (user.role === 0 ? 'User' : 'Manager')
          },
          {
            title: 'Email',
            dataIndex: 'email',
            render: (_, user) => user.email
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
            render: (_, user) => user.phone
          },
          {
            title: 'Gender',
            dataIndex: 'gender',
            render: (_, user) => user.gender ?? '-'
          },
          {
            title: 'Birthday',
            dataIndex: 'date_of_birth',
            render: (_, user) =>
              user.date_of_birth ? dayjs(user.date_of_birth, 'YYYY-MM-DD').format('DD/MM/YYYY') : '-'
          },
          {
            title: 'Cinema',
            dataIndex: 'cinema',
            render: (_, user) => user.theater_name ?? '-'
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: (_, user) => (user.status === 0 ? 'Not yet active' : user.status === 1 ? 'Actived' : 'Stop working')
          },
          {
            title: 'Action',
            align: 'right',
            render: (_, user) => (
              <Space direction='horizontal'>
                {/* <Tooltip title={<div>Update</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    icon={<Icon.EditOutlined />}
                    onClick={() => handleUpdate(user)}
                  ></Button>
                </Tooltip> */}
                <Tooltip title={<div>Delete</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    danger={true}
                    icon={<Icon.DeleteOutlined />}
                    onClick={() => handleOnClickDelete(user._id)}
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
        onDelete={() => handleDeleteUser(false)}
      />
      <ModalDelete
        open={isOpenDeleteMultiModal}
        setIsOpenDeleteModal={setIsOpenDeleteMultiModal}
        onDelete={() => handleDeleteUser(true)}
        countItem={selectedRowKeys.length}
      />
    </Card>
  )
}
