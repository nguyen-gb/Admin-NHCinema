import React, { useEffect } from 'react'
import { Form, Input, Modal, Button, DatePicker, Select } from 'antd'

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

  useEffect(() => {
    if (!props.open) {
      form.resetFields()
    }
  }, [form, props.open])

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
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item name='english_name' label='English name' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='English name' />
        </Form.Item>
        <Form.Item name='poster' label='Poster' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Poster' />
        </Form.Item>
        <Form.Item name='thumbnail' label='Thumbnail' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Thumbnail' />
        </Form.Item>
        <Form.Item name='trailer' label='Trailer' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Trailer' />
        </Form.Item>
        <Form.Item name='duration' label='Duration' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Duration' />
        </Form.Item>
        <Form.Item name='release' label='Release' rules={[{ required: true, message: 'Required field' }]}>
          <DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item name='genres' label='Genres' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Genres' />
        </Form.Item>
        <Form.Item name='director' label='Director' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Director' />
        </Form.Item>
        <Form.Item name='performer' label='Performer' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Performer' />
        </Form.Item>
        <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Required field' }]}>
          <Input.TextArea placeholder='Description' />
        </Form.Item>
        <Form.Item name='format' label='Format' rules={[{ required: true, message: 'Required field' }]}>
          <Select
            placeholder='Movie'
            showSearch={false}
            options={[
              {
                value: '2D',
                label: '2D'
              },
              {
                value: '3D',
                label: '3D'
              }
            ]}
          />
        </Form.Item>
        <Form.Item name='age' label='Age' rules={[{ required: true, message: 'Required field' }]}>
          <Select
            placeholder='Age'
            showSearch={false}
            options={[
              {
                value: 'P',
                label: 'P'
              },
              {
                value: 'T13',
                label: 'T13'
              },
              {
                value: 'T16',
                label: 'T16'
              },
              {
                value: 'T18',
                label: 'T18'
              }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
