import React, { useState } from 'react'
import { Table, Button, Card, Space, notification, Divider, Input, Tooltip, Modal } from 'antd'

import * as Icon from '@ant-design/icons'
import DeleteNav from './components/DeleteNav'
import ModalDelete from './components/DeleteModel'
import { Movie } from 'src/types/movie.type'
import { PopupForm } from './components/PopupForm'

const dataTable = [
  {
    _id: '1',
    name: 'Cú máy ăn tiền',
    english_name: 'COWEB',
    genre: 'Tâm Lý',
    format: '2D',
    age: '13T',
    release: '20/10/2023',
    duration: '110',
    director: 'Nguyễn Quang Dũng',
    performer: 'Hồng Ánh, Huỳnh Hạo Khang, Mai Tài Phến, Công Ninh, Hứa Vĩ Văn, Tuyền Mập, Tuấn Trần,...',
    description:
      'Cú Máy Ăn Tiền lấy bối cảnh thực tế và câu chuyện làm phim những năm 1970 ở Hàn Quốc. Kim Yeol (Song Kang Ho thủ vai) - một đạo diễn điện ảnh có bộ phim đầu tay được giới phê bình khen ngợi, nhưng sự nghiệp của ông tuột dốc không phanh khi liên tiếp ra đời những tác phẩm bị coi là “phim rác”. Sau khi hoàn thành xong bộ phim mới nhất là Cobweb, đạo diễn Kim cảm thấy cần quay lại cái kết để có thể tạo ra một kiệt tác.',
    poster: 'https://touchcinema.com/uploads/phim-2021/470x700-1-1696833721-poster.jpg',
    thumbnail: 'https://touchcinema.com/storage/slider-app/1920x1080-3-1696833894.jpg',
    trailer: 'https://youtu.be/d-ck5QxqgMg',
    rating: 0,
    status: 1,
    times: ['13:00', '14:00', '16:00'],
    title: 'hi'
  },
  {
    _id: '2',
    name: 'Cú máy ăn tiền',
    english_name: 'COWEB',
    genre: 'Tâm Lý',
    format: '2D',
    age: '13T',
    release: '20/10/2023',
    duration: '110',
    director: 'Nguyễn Quang Dũng',
    performer: 'Hồng Ánh, Huỳnh Hạo Khang, Mai Tài Phến, Công Ninh, Hứa Vĩ Văn, Tuyền Mập, Tuấn Trần,...',
    description:
      'Cú Máy Ăn Tiền lấy bối cảnh thực tế và câu chuyện làm phim những năm 1970 ở Hàn Quốc. Kim Yeol (Song Kang Ho thủ vai) - một đạo diễn điện ảnh có bộ phim đầu tay được giới phê bình khen ngợi, nhưng sự nghiệp của ông tuột dốc không phanh khi liên tiếp ra đời những tác phẩm bị coi là “phim rác”. Sau khi hoàn thành xong bộ phim mới nhất là Cobweb, đạo diễn Kim cảm thấy cần quay lại cái kết để có thể tạo ra một kiệt tác.',
    poster: 'https://touchcinema.com/uploads/phim-2021/470x700-1-1696833721-poster.jpg',
    thumbnail: 'https://touchcinema.com/storage/slider-app/1920x1080-3-1696833894.jpg',
    trailer: 'https://youtu.be/d-ck5QxqgMg',
    rating: 0,
    status: 1,
    times: ['13:00', '14:00', '16:00'],
    title: 'hi'
  },
  {
    _id: '3',
    name: 'Cú máy ăn tiền',
    english_name: 'COWEB',
    genre: 'Tâm Lý',
    format: '2D',
    age: '13T',
    release: '20/10/2023',
    duration: '110',
    director: 'Nguyễn Quang Dũng',
    performer: 'Hồng Ánh, Huỳnh Hạo Khang, Mai Tài Phến, Công Ninh, Hứa Vĩ Văn, Tuyền Mập, Tuấn Trần,...',
    description:
      'Cú Máy Ăn Tiền lấy bối cảnh thực tế và câu chuyện làm phim những năm 1970 ở Hàn Quốc. Kim Yeol (Song Kang Ho thủ vai) - một đạo diễn điện ảnh có bộ phim đầu tay được giới phê bình khen ngợi, nhưng sự nghiệp của ông tuột dốc không phanh khi liên tiếp ra đời những tác phẩm bị coi là “phim rác”. Sau khi hoàn thành xong bộ phim mới nhất là Cobweb, đạo diễn Kim cảm thấy cần quay lại cái kết để có thể tạo ra một kiệt tác.',
    poster: 'https://touchcinema.com/uploads/phim-2021/470x700-1-1696833721-poster.jpg',
    thumbnail: 'https://touchcinema.com/storage/slider-app/1920x1080-3-1696833894.jpg',
    trailer: 'https://youtu.be/d-ck5QxqgMg',
    rating: 0,
    status: 1,
    times: ['13:00', '14:00', '16:00'],
    title: 'hi'
  }
]

export const MoviePage = () => {
  // hook

  // query api
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [keyword, setKeyword] = useState('')

  // state
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isOpenDeleteMultiModal, setIsOpenDeleteMultiModal] = useState<boolean>(false)
  const [formData, setFormData] = useState<Movie>()
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
        />
      </Space>
      <Divider />
      {selectedRowKeys.length > 0 && (
        <DeleteNav countItem={selectedRowKeys.length} setIsOpenDeleteMultiModal={setIsOpenDeleteMultiModal} />
      )}
      <Table
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
            title: '#',
            dataIndex: 'id',
            width: '7%',
            render: (_, movie) => movie._id
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
