import React, { useState } from 'react'
import { Table, Button, Card, Space, Divider, Input, Tooltip, Image } from 'antd'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import * as Icon from '@ant-design/icons'
import DeleteNav from './components/DeleteNav'
import ModalDelete from './components/DeleteModel'
import { Movie, MovieListConfig } from 'src/types/movie.type'
import { PopupForm } from './components/PopupForm'
import movieApi from 'src/apis/movie.api'

export const MoviePage = () => {
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
  const { data, isLoading } = useQuery({
    queryKey: ['movie', queryConfig],
    queryFn: () => {
      return movieApi.getMovies(queryConfig as MovieListConfig)
    }
    // keepPreviousData: true,
    // staleTime: 3 * 60 * 1000
  })
  const dataTable = data?.data.data

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
    // if (isDeleMore) {
    //   deleteMultiple(selectedRowKeys)
    //     .unwrap()
    //     .then(() => {
    //       notification.success({
    //         message: 'Delete success'
    //       })
    //       setSelectedRowKeys([])
    //       setIsOpenDeleteModal(false)
    //     })
    //     .catch((err: any) => {
    //       notification.error({
    //         message: err.statusText
    //       })
    //     })
    // } else {
    //   deleteMovie(idDelete || id)
    //     .unwrap()
    //     .then(() => {
    //       notification.success({
    //         message: 'Delete success'
    //       })
    //       setIsOpenDeleteModal(false)
    //     })
    //     .catch((err: ResponseError) => {
    //       notification.error({
    //         message: err.statusText
    //       })
    //     })
    // }
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
      title='Movie'
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
            title: 'Tên',
            dataIndex: 'name',
            render: (_, movie) => movie.name
          },
          {
            title: 'poster',
            dataIndex: 'poster',
            render: (_, movie) => <Image src={movie.poster} style={{ maxHeight: '50px' }} />
          },
          {
            title: 'thumbnail',
            dataIndex: 'thumbnail',
            render: (_, movie) => <Image src={movie.thumbnail} style={{ maxWidth: '100px' }} />
          },
          {
            title: 'Thời lượng',
            dataIndex: 'duration',
            render: (_, movie) => `${movie.duration} (phút)`
          },
          {
            title: 'Ngày khởi chiếu',
            dataIndex: 'release',
            render: (_, movie) => dayjs(movie.release).format('DD-MM-YYYY')
          },
          {
            title: 'Thể loại',
            dataIndex: 'genres',
            render: (_, movie) => movie.genres
          },
          {
            title: 'Định dạng',
            dataIndex: 'format',
            render: (_, movie) => movie.format
          },
          {
            title: 'Action',
            align: 'right',
            render: (_, movie) => (
              <Space direction='horizontal'>
                <Tooltip title={<div>Update</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    icon={<Icon.EditOutlined />}
                    onClick={() => handleUpdate(movie)}
                  ></Button>
                </Tooltip>
                <Tooltip title={<div>Delete</div>}>
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
