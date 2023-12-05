import React, { useContext, useState } from 'react'
import { Table, Button, Card, Space, Divider, Input, Tooltip, Select, DatePicker } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as Icon from '@ant-design/icons'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import DeleteNav from './components/DeleteNav'
import ModalDelete from './components/DeleteModel'
import { PopupForm } from './components/PopupForm'
import showtimeApi from 'src/apis/showtime.api'
import { Showtime } from 'src/types/showtime.type'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import { isBeforeFourDay } from 'src/utils/utils'
import movieApi from 'src/apis/movie.api'

export const ShowtimesPage = () => {
  // hook
  const { t } = useTranslation('showtimes')
  const { profile } = useContext(AppContext)

  // query api
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [keyword, setKeyword] = useState('')
  const [movie, setMovie] = useState('')
  const [showtime, setShowtime] = useState('')

  const queryConfig = {
    theater_id: profile?.theater_id,
    page: currentPage,
    page_size: pageSize,
    key_search: keyword,
    movie_id: movie,
    time: showtime
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['showtime', queryConfig],
    queryFn: () => showtimeApi.getShowtimes(queryConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataTable = data?.data.data
  const total = data?.data.total_record

  const { data: dataMovie } = useQuery({
    queryKey: ['movie', queryConfig],
    queryFn: () => movieApi.getMovies(),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const movies = dataMovie?.data.data

  const deleteShowtime = useMutation({
    mutationKey: ['showtime'],
    mutationFn: (body: string) => showtimeApi.deleteShowtime(body)
  })

  // state
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isOpenDeleteMultiModal, setIsOpenDeleteMultiModal] = useState<boolean>(false)
  const [formData, setFormData] = useState<Showtime>()
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
  const handleUpdate = (showtime: Showtime) => {
    setFormData(showtime)
    handleOpenModal()
  }
  //delete
  const handleOnClickDelete = (id: string) => {
    setIdDelete(id)
    setIsOpenDeleteModal(true)
  }
  const handleDeleteShowtime = (isDeleMore: boolean) => {
    const body = isDeleMore ? selectedRowKeys : idDelete
    deleteShowtime.mutate(body as string, {
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
      title={t('showtimes')}
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
          allowClear
          style={{ minWidth: 200 }}
          placeholder={t('movie')}
          showSearch={false}
          options={movies?.map((movie) => {
            return {
              value: movie._id,
              label: movie.name
            }
          })}
          onChange={(value) => setMovie(value)}
        />
        <DatePicker format='DD/MM/YYYY' onChange={(value) => setShowtime(value?.format('YYYY-MM-DD') || '')} />
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
            title: t('movie'),
            dataIndex: 'movie_name',
            render: (_, showtime) => showtime.movie_name
          },
          {
            title: t('date'),
            dataIndex: 'time',
            render: (_, showtime) => dayjs(showtime.time, 'YYYY-MM-DD').format('DD/MM/YYYY')
          },
          {
            title: t('time'),
            dataIndex: 'showtime',
            render: (_, showtime) => showtime.showtime
          },
          {
            title: t('room'),
            dataIndex: 'room_name',
            render: (_, showtime) => showtime.room_name
          },
          {
            title: t('action'),
            align: 'right',
            render: (_, showtime) => (
              <Space direction='horizontal'>
                <Tooltip title={<div>{t('update')}</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    icon={<Icon.EditOutlined />}
                    onClick={() => handleUpdate(showtime)}
                    disabled={isBeforeFourDay(showtime.time, showtime.showtime)}
                  ></Button>
                </Tooltip>
                <Tooltip title={<div>{t('delete')}</div>}>
                  <Button
                    loading={false}
                    size='middle'
                    danger={true}
                    icon={<Icon.DeleteOutlined />}
                    onClick={() => handleOnClickDelete(showtime._id)}
                    disabled={isBeforeFourDay(showtime.time, showtime.showtime)}
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
        onDelete={() => handleDeleteShowtime(false)}
      />
      <ModalDelete
        open={isOpenDeleteMultiModal}
        setIsOpenDeleteModal={setIsOpenDeleteMultiModal}
        onDelete={() => handleDeleteShowtime(true)}
        countItem={selectedRowKeys.length}
      />
    </Card>
  )
}
