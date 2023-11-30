import React, { useState } from 'react'
import { Table, Button, Card, Space, Divider, Input, Tooltip, Image } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as Icon from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import DeleteNav from './components/DeleteNav'
import ModalDelete from './components/DeleteModel'
import { Movie, MovieListConfig } from 'src/types/movie.type'
import { PopupForm } from './components/PopupForm'
import movieApi from 'src/apis/movie.api'
import { ErrorResponse } from 'src/types/utils.type'

export const MoviePage = () => {
  const { t } = useTranslation('movie')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [keyword, setKeyword] = useState('')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isOpenDeleteMultiModal, setIsOpenDeleteMultiModal] = useState<boolean>(false)
  const [formData, setFormData] = useState<Movie>()
  const [idDelete, setIdDelete] = useState<string>('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [keywordInput, setKeywordInput] = useState('')

  const queryConfig = {
    key_search: keyword
  }
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['movie', queryConfig],
    queryFn: () => {
      return movieApi.getMovies(queryConfig as MovieListConfig)
    }
    // keepPreviousData: true,
    // staleTime: 3 * 60 * 1000
  })
  const dataTable = data?.data.data

  const deleteMovie = useMutation({
    mutationKey: ['movie'],
    mutationFn: (body: string[]) => movieApi.deleteMovie(body)
  })

  // reset & refresh
  const resetParamsAndRefresh = () => {
    setCurrentPage(1)
    setPageSize(20)
    setKeyword('')
    setKeywordInput('')
  }
  //update
  const handleUpdate = (movie: Movie) => {
    setFormData(movie)
    handleOpenModal()
  }
  //delete
  const handleOnClickDelete = (id: string) => {
    setIdDelete(id)
    setIsOpenDeleteModal(true)
  }
  const handleDeleteMovie = (isDeleMore: boolean) => {
    const body = isDeleMore ? selectedRowKeys : [idDelete]
    deleteMovie.mutate(body as string[], {
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
  }

  return (
    <Card
      title={t('movie')}
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
          loading={isLoading}
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
        loading={isLoading}
        rowKey='_id'
        scroll={{ x: 1080 }}
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
            title: t('name'),
            dataIndex: 'name',
            render: (_, movie) => movie.name
          },
          {
            title: t('poster'),
            dataIndex: 'poster',
            render: (_, movie) => <Image src={movie.poster as string} style={{ maxHeight: '50px' }} />
          },
          {
            title: t('thumbnail'),
            dataIndex: 'thumbnail',
            render: (_, movie) => <Image src={movie.thumbnail as string} style={{ maxWidth: '100px' }} />
          },
          {
            title: t('duration'),
            dataIndex: 'duration',
            render: (_, movie) => `${movie.duration} (phút)`
          },
          {
            title: t('release'),
            dataIndex: 'release',
            render: (_, movie) => movie.release
          },
          {
            title: t('genres'),
            dataIndex: 'genres',
            render: (_, movie) => movie.genres
          },
          {
            title: t('format'),
            dataIndex: 'format',
            render: (_, movie) => movie.format
          },
          {
            title: t('action'),
            align: 'right',
            render: (_, movie) => (
              <Space direction='horizontal'>
                <Tooltip title={<div>{t('update')}</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    icon={<Icon.EditOutlined />}
                    onClick={() => handleUpdate(movie)}
                  ></Button>
                </Tooltip>
                <Tooltip title={<div>{t('delete')}</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    danger={true}
                    icon={<Icon.DeleteOutlined />}
                    onClick={() => handleOnClickDelete(movie._id)}
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
        onDelete={() => handleDeleteMovie(false)}
      />
      <ModalDelete
        open={isOpenDeleteMultiModal}
        setIsOpenDeleteModal={setIsOpenDeleteMultiModal}
        onDelete={() => handleDeleteMovie(true)}
        countItem={selectedRowKeys.length}
      />
    </Card>
  )
}
