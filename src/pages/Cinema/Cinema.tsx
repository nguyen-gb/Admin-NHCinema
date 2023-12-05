import React, { useState } from 'react'
import { Table, Button, Card, Space, Divider, Input, Tooltip, Tag } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as Icon from '@ant-design/icons'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import DeleteNav from './components/DeleteNav'
import ModalDelete from './components/DeleteModel'
import { PopupForm } from './components/PopupForm'
import cinemaApi from 'src/apis/cinema.api'
import { Cinema } from 'src/types/cinema.type'
import { ErrorResponse } from 'src/types/utils.type'

export const CinemaPage = () => {
  // hook
  const { t } = useTranslation('cinema')

  // query api
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [keyword, setKeyword] = useState('')

  const queryConfig = {
    page: currentPage,
    page_size: pageSize,
    key_search: keyword
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cinema', queryConfig],
    queryFn: () => cinemaApi.getCinemas(queryConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataTable = data?.data.data
  const total = data?.data.total_record

  const deleteCinema = useMutation({
    mutationKey: ['cinema'],
    mutationFn: (body: string[]) => cinemaApi.deleteCinema(body)
  })

  // state
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isOpenDeleteMultiModal, setIsOpenDeleteMultiModal] = useState<boolean>(false)
  const [formData, setFormData] = useState<Cinema>()
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
  const handleUpdate = (cinema: Cinema) => {
    setFormData(cinema)
    handleOpenModal()
  }
  //delete
  const handleOnClickDelete = (id: string) => {
    setIdDelete(id)
    setIsOpenDeleteModal(true)
  }
  const handleDeleteCinema = (isDeleMore: boolean) => {
    const body = isDeleMore ? selectedRowKeys : [idDelete]
    deleteCinema.mutate(body as string[], {
      onSuccess: () => {
        toast.success(t('delete-success'))

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
      title={t('cinema')}
      extra={
        <Space>
          <Button type='primary' size='middle' icon={<Icon.PlusOutlined />} onClick={handleOpenModal}>
            {t('add-new')}
          </Button>
        </Space>
      }
    >
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
            render: (_, cinema) => cinema.name
          },
          {
            title: t('address'),
            dataIndex: 'address',
            render: (_, cinema) => cinema.address
          },
          {
            title: t('status'),
            dataIndex: 'status',
            render: (_, cinema) =>
              cinema.status === 0 ? <Tag color='red'>Disable</Tag> : <Tag color='blue'>Available</Tag>
          },
          {
            title: t('action'),
            align: 'right',
            render: (_, cinema) => (
              <Space direction='horizontal'>
                <Tooltip title={<div>{t('update')}</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    icon={<Icon.EditOutlined />}
                    onClick={() => handleUpdate(cinema)}
                  ></Button>
                </Tooltip>
                <Tooltip title={<div>{t('delete')}</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    danger={true}
                    icon={<Icon.DeleteOutlined />}
                    onClick={() => handleOnClickDelete(cinema._id)}
                  ></Button>
                </Tooltip>
              </Space>
            )
          }
        ]}
      />

      <PopupForm
        key={formData?._id}
        title={formData ? t('update') : t('add-new')}
        open={isOpenModal}
        formData={formData}
        onCancel={handleCloseModal}
        onDone={handleCloseModal}
        formType={formData ? 'UPDATE' : 'CREATE'}
      />
      <ModalDelete
        open={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        onDelete={() => handleDeleteCinema(false)}
      />
      <ModalDelete
        open={isOpenDeleteMultiModal}
        setIsOpenDeleteModal={setIsOpenDeleteMultiModal}
        onDelete={() => handleDeleteCinema(true)}
        countItem={selectedRowKeys.length}
      />
    </Card>
  )
}
