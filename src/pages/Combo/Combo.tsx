import React, { useState } from 'react'
import { Table, Button, Card, Space, Divider, Input, Tooltip, Select, Tag } from 'antd'
import * as Icon from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import DeleteNav from './components/DeleteNav'
import ModalDelete from './components/DeleteModel'
import { PopupForm } from './components/PopupForm'
import comboApi from 'src/apis/combo.api'
import { Combo, comboType } from 'src/types/combo.type'
import { ErrorResponse } from 'src/types/utils.type'

export const ComboPage = () => {
  // hook
  const { t } = useTranslation('combo')

  // query api
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [keyword, setKeyword] = useState('')
  const [type, setType] = useState<number | null>(null)

  const queryConfig = {
    page: currentPage,
    page_size: pageSize,
    key_search: keyword,
    type: type
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['combo', queryConfig],
    queryFn: () => comboApi.getCombos(queryConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataTable = data?.data.data
  const total = data?.data.total_record

  const deleteCombo = useMutation({
    mutationKey: ['combo'],
    mutationFn: (body: string[]) => comboApi.deleteCombo(body)
  })

  // state
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isOpenDeleteMultiModal, setIsOpenDeleteMultiModal] = useState<boolean>(false)
  const [formData, setFormData] = useState<Combo>()
  const [idDelete, setIdDelete] = useState<string>('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [keywordInput, setKeywordInput] = useState('')

  // handle action
  const resetParamsAndRefresh = () => {
    setCurrentPage(1)
    setPageSize(20)
    setKeyword('')
    setKeywordInput('')
    setType(null)
  }
  //update
  const handleUpdate = (combo: Combo) => {
    setFormData(combo)
    handleOpenModal()
  }
  //delete
  const handleOnClickDelete = (id: string) => {
    setIdDelete(id)
    setIsOpenDeleteModal(true)
  }
  const handleDeleteCombo = (isDeleMore: boolean) => {
    const body = isDeleMore ? selectedRowKeys : [idDelete]
    deleteCombo.mutate(body as string[], {
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
      title={t('combo')}
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
        <Select
          style={{ minWidth: 150 }}
          placeholder={t('type')}
          showSearch={false}
          options={comboType.map((combo, index) => {
            return {
              value: index + 1,
              label: combo
            }
          })}
          onChange={(value) => setType(value)}
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
            render: (_, combo) => combo.name
          },
          {
            title: t('description'),
            dataIndex: 'description',
            render: (_, combo) => combo.description
          },
          {
            title: t('price'),
            dataIndex: 'price',
            render: (_, combo) => combo.price
          },
          {
            title: t('type'),
            dataIndex: 'type',
            render: (_, combo) => comboType[combo.type - 1]
          },
          {
            title: t('status'),
            dataIndex: 'status',
            render: (_, movie) =>
              movie.status === 0 ? <Tag color='red'>Disable</Tag> : <Tag color='blue'>Available</Tag>
          },
          {
            title: t('action'),
            align: 'right',
            render: (_, combo) => (
              <Space direction='horizontal'>
                <Tooltip title={<div>{t('update')}</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    icon={<Icon.EditOutlined />}
                    onClick={() => handleUpdate(combo)}
                  ></Button>
                </Tooltip>
                <Tooltip title={<div>{t('delete')}</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    danger={true}
                    icon={<Icon.DeleteOutlined />}
                    onClick={() => handleOnClickDelete(combo._id)}
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
        onDelete={() => handleDeleteCombo(false)}
      />
      <ModalDelete
        open={isOpenDeleteMultiModal}
        setIsOpenDeleteModal={setIsOpenDeleteMultiModal}
        onDelete={() => handleDeleteCombo(true)}
        countItem={selectedRowKeys.length}
      />
    </Card>
  )
}
