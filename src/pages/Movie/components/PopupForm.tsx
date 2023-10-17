import React from 'react'
import { Form, Input, Modal, Button, notification } from 'antd'
import { omit } from 'lodash'
import { Movie } from 'src/types/movie.type'

interface Props {
  title: string
  open: boolean
  formData: Movie | undefined
  onDone(): void
  onCancel(): void
  formType: string
}

const defaultSubmit: Movie = {
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
}

const defaultSubmitWithoutId = omit(defaultSubmit, '_id')

export const PopupForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm<Movie>()
  // api
  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        if (props.formType === 'UPDATE') {
          // updateMovie({
          //   ...defaultSubmit,
          //   ...value,
          //   _id: props.formData!._id
          // })
          //   .unwrap()
          //   .then(() => {
          //     notification.success({
          //       message: t('api.update-successfully')
          //     })
          //     props.onDone()
          //   })
          //   .catch((err: ResponseError) => {
          //     notification.error({
          //       message: err.statusText
          //     })
          //   })
        } else {
          // createMovie({
          //   ...defaultSubmitWithoutId,
          //   ...value
          // })
          //   .unwrap()
          //   .then(() => {
          //     notification.success({
          //       message: t('api.create-successfully')
          //     })
          //     props.onDone()
          //   })
          //   .catch((err: ResponseError) => {
          //     console.log(err)
          //     notification.error({
          //       message: err?.data?.error ?? err.statusText
          //     })
          //   })
        }
      })
      .catch(
        (err) =>
          new Promise((resolve) => {
            setTimeout(() => resolve(err), 200)
            console.log(err)
          })
      )
      .catch((err) => console.log(err))
  }

  return (
    <Modal
      title={props.title}
      confirmLoading={false}
      okButtonProps={{
        disabled: false
      }}
      cancelButtonProps={{
        hidden: true
      }}
      forceRender
      open={props.open}
      onCancel={props.onCancel}
      onOk={handleSubmit}
      centered={true}
      width={600}
      // okText={props.formType === FormType.UPDATE ? 'Update' : 'Add'}
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
      footer={[
        <Button
          key='submit'
          type='primary'
          onClick={handleSubmit}
          style={{ width: '100%', marginTop: '0px' }}
          // disabled={isLoadingCreate || isLoadingUpdate}
        >
          {props.formType}
        </Button>
      ]}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          ...defaultSubmit,
          ...props?.formData
        }}
      >
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Description' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
