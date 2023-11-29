import React, { useEffect } from 'react'
import { Form, Input, Modal, Button, DatePicker, Select } from 'antd'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('movie')
  const [form] = Form.useForm<Movie>()
  // api
  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        // if (props.formType === 'UPDATE') {
        //   const body = {
        //     ...props.formData,
        //     ...value,
        //     price: Number(value.price)
        //   }
        //   console.log(body)
        //   updateCombo.mutate(body, {
        //     onSuccess: () => {
        //       toast.success(t('update-success'))
        //       props.onDone()
        //     },
        //     onError: (error) => {
        //       toast.error((error as ErrorResponse<any>).message)
        //     }
        //   })
        // } else {
        //   const body = {
        //     ...value,
        //     price: Number(value.price)
        //   }
        //   createCombo.mutate(body, {
        //     onSuccess: () => {
        //       toast.success(t('create-success'))
        //       props.onDone()
        //     },
        //     onError: (error) => {
        //       toast.error((error as ErrorResponse<any>).message)
        //     }
        //   })
        // }
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
          //disabled={createCombo.isLoading || updateCombo.isLoading}
        >
          {props.formType === 'UPDATE' ? t('update') : t('add-new')}
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
        <Form.Item name='name' label={t('name')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('name')} />
        </Form.Item>
        <Form.Item
          name='english_name'
          label={t('english-name')}
          rules={[{ required: true, message: t('required-field') }]}
        >
          <Input placeholder={t('english-name')} />
        </Form.Item>
        <Form.Item name='poster' label={t('poster')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('poster')} />
        </Form.Item>
        <Form.Item name='thumbnail' label={t('thumbnail')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('thumbnail')} />
        </Form.Item>
        <Form.Item name='trailer' label={t('trailer')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('trailer')} />
        </Form.Item>
        <Form.Item name='duration' label={t('duration')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('duration')} />
        </Form.Item>
        <Form.Item name='release' label={t('release')} rules={[{ required: true, message: t('required-field') }]}>
          <DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item name='genres' label={t('genres')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('genres')} />
        </Form.Item>
        <Form.Item name='director' label={t('director')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('director')} />
        </Form.Item>
        <Form.Item name='performer' label={t('performer')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('performer')} />
        </Form.Item>
        <Form.Item
          name='description'
          label={t('description')}
          rules={[{ required: true, message: t('required-field') }]}
        >
          <Input.TextArea placeholder={t('description')} />
        </Form.Item>
        <Form.Item name='format' label={t('format')} rules={[{ required: true, message: t('required-field') }]}>
          <Select
            placeholder={t('format')}
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
        <Form.Item name='age' label={t('age')} rules={[{ required: true, message: t('required-field') }]}>
          <Select
            placeholder={t('age')}
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
