import React, { useContext, useState } from 'react'
import { Table, Button, Card, Space, Divider, Input, Tooltip, Image, Select, Switch } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as Icon from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import DeleteNav from './components/DeleteNav'
import ModalDelete from './components/DeleteModel'
import { Movie } from 'src/types/movie.type'
import { PopupForm } from './components/PopupForm'
import movieApi from 'src/apis/movie.api'
import { Params } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import genreApi from 'src/apis/genre.api'
import { Genre } from 'src/types/genre.type'

export const MoviePage = () => {
  const { profile } = useContext(AppContext)
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
  const [genres, setGenres] = useState<string[]>([])

  const queryConfig = {
    page: currentPage,
    page_size: pageSize,
    key_search: keyword,
    genres: genres.join(',')
  }
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['movie', queryConfig],
    queryFn: () => movieApi.getMovies(queryConfig as Params),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const dataTable = data?.data.data
  const total = data?.data.total_record

  const deleteMovie = useMutation({
    mutationKey: ['movie'],
    mutationFn: (body: string[]) => movieApi.deleteMovie(body)
  })

  const { data: dataGenre } = useQuery({
    queryKey: ['genre'],
    queryFn: () => genreApi.getGenres(),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const genresApi = dataGenre?.data.data as Genre[]

  // reset & refresh
  const resetParamsAndRefresh = () => {
    setCurrentPage(1)
    setPageSize(20)
    setKeyword('')
    setKeywordInput('')
    setGenres([])
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
  const handleDeleteMovie = (isDeleMore: boolean, id: string = idDelete) => {
    const body = isDeleMore ? selectedRowKeys : [id]
    deleteMovie.mutate(body as string[], {
      onSuccess: () => {
        toast.success(t('update-success'))

        if (isDeleMore) {
          setIsOpenDeleteMultiModal(false)
          setSelectedRowKeys([])
        } else {
          setIsOpenDeleteModal(false)
          setIdDelete('')
        }

        refetch()
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
      title={t('movie')}
      extra={
        <Space>
          <Button
            type='primary'
            size='middle'
            icon={<Icon.PlusOutlined />}
            onClick={handleOpenModal}
            disabled={profile?.role === 1}
          >
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
        <Select
          style={{ minWidth: 200 }}
          placeholder={t('genres')}
          mode='multiple'
          showSearch={false}
          options={genresApi?.map((genre) => {
            return {
              value: genre._id,
              label: genre.name
            }
          })}
          onChange={(value) => setGenres(value)}
          value={genres}
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
          total: total,
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
            title: t('status'),
            dataIndex: 'status',
            render: (_, movie) => (
              <Switch
                disabled={profile?.role === 1}
                loading={deleteMovie.isLoading}
                defaultChecked={Boolean(movie.status)}
                checked={Boolean(movie.status)}
                onChange={() => {
                  handleOnClickDelete(movie._id)
                }}
              />
            )
          },
          {
            title: t('action'),
            align: 'right',
            render: (_, movie) => (
              <Space direction='horizontal'>
                <Tooltip title={<div>{t('update')}</div>}>
                  <Button
                    disabled={profile?.role === 1}
                    loading={false}
                    size='middle'
                    icon={<Icon.EditOutlined />}
                    onClick={() => handleUpdate(movie)}
                  ></Button>
                </Tooltip>
                {/* <Tooltip title={<div>{t('delete')}</div>}>
                  <Button
                    disabled={profile?.role === 1}
                    loading={false}
                    size='middle'
                    danger={true}
                    icon={<Icon.DeleteOutlined />}
                    onClick={() => handleOnClickDelete(movie._id)}
                  ></Button>
                </Tooltip> */}
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
