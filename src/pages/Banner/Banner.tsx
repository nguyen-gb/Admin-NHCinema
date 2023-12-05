import React, { useState } from 'react'
import { Table, Button, Card, Space, Divider, Tooltip, Image } from 'antd'
import * as Icon from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import DeleteNav from './components/DeleteNav'
import ModalDelete from './components/DeleteModel'
import { PopupForm } from './components/PopupForm'
import bannerApi from 'src/apis/banner.api'
import { Banner } from 'src/types/banner.type'
import { ErrorResponse } from 'src/types/utils.type'

export const BannerPage = () => {
  // hook
  const { t } = useTranslation('banner')

  // query api
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  // const [keyword, setKeyword] = useState('')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['banner'],
    queryFn: () => bannerApi.getBanners(),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataTable = data?.data.data

  const deleteBanner = useMutation({
    mutationKey: ['banner'],
    mutationFn: (body: string[]) => bannerApi.deleteBanner(body)
  })

  // state
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isOpenDeleteMultiModal, setIsOpenDeleteMultiModal] = useState<boolean>(false)
  const [formData, setFormData] = useState<Banner>()
  const [idDelete, setIdDelete] = useState<string>('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  // // const [keywordInput, setKeywordInput] = useState('')

  // handle action
  // const resetParamsAndRefresh = () => {
  //   setCurrentPage(1)
  //   setPageSize(20)
  //   setKeyword('')
  //   setKeywordInput('')
  // }
  //update
  const handleUpdate = (banner: Banner) => {
    setFormData(banner)
    handleOpenModal()
  }
  //delete
  const handleOnClickDelete = (id: string) => {
    setIdDelete(id)
    setIsOpenDeleteModal(true)
  }
  const handleDeleteBanner = (isDeleMore: boolean) => {
    const body = isDeleMore ? selectedRowKeys : [idDelete]
    deleteBanner.mutate(body as string[], {
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
      title={t('banner')}
      extra={
        <Space>
          <Button type='primary' size='middle' icon={<Icon.PlusOutlined />} onClick={handleOpenModal}>
            {t('add-new')}
          </Button>
        </Space>
      }
    >
      {/* <Space wrap>
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
      </Space> */}
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
            title: t('title'),
            dataIndex: 'title',
            width: '23%',
            render: (_, banner) => banner.title
          },
          {
            title: t('banner'),
            dataIndex: 'file',
            render: (_, banner) => <Image src={banner.file} width={'20%'} />
          },
          {
            title: t('action'),
            align: 'right',
            render: (_, banner) => (
              <Space direction='horizontal'>
                <Tooltip title={<div>{t('update')}</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    icon={<Icon.EditOutlined />}
                    onClick={() => handleUpdate(banner)}
                  ></Button>
                </Tooltip>
                <Tooltip title={<div>{t('delete')}</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    danger={true}
                    icon={<Icon.DeleteOutlined />}
                    onClick={() => handleOnClickDelete(banner._id)}
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
        onDelete={() => handleDeleteBanner(false)}
      />
      <ModalDelete
        open={isOpenDeleteMultiModal}
        setIsOpenDeleteModal={setIsOpenDeleteMultiModal}
        onDelete={() => handleDeleteBanner(true)}
        countItem={selectedRowKeys.length}
      />
    </Card>
  )
}
