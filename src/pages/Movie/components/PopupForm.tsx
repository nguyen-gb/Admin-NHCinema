import React from 'react'
import { Form, Input, Modal, Button } from 'antd'
import { Movie } from 'src/types/movie.type'

interface Props {
  title: string
  open: boolean
  formData: Movie | undefined
  onDone(): void
  onCancel(): void
  formType: string
}

export const PopupForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm<Movie>()
  // api
  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        if (props.formType === 'UPDATE') {
          // updateMovie({
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
          ...props?.formData
        }}
      >
        <Form.Item name='name' label='Tên' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Tên' />
        </Form.Item>
        <Form.Item name='english_name' label='Tên tiếng Anh' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Tên tiếng Anh' />
        </Form.Item>
        <Form.Item name='poster' label='Poster' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Poster' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
