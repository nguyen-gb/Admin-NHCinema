import React, { useEffect } from 'react'
import { Form, Input, Modal, Button } from 'antd'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { Cinema } from 'src/types/cinema.type'
import cinemaApi from 'src/apis/cinema.api'
import { ErrorResponse } from 'src/types/utils.type'

interface Props {
  title: string
  open: boolean
  formData: Cinema | undefined
  onDone(): void
  onCancel(): void
  formType: string
}

const defaultSubmit: Cinema = {
  _id: '',
  name: '',
  address: ''
}

const defaultSubmitWithoutId = omit(defaultSubmit, '_id')

export const PopupForm: React.FC<Props> = (props) => {
  const { t } = useTranslation('cinema')
  const [form] = Form.useForm<Cinema>()
  // api
  const createCinema = useMutation({
    mutationKey: ['cinema'],
    mutationFn: (body: Cinema) => cinemaApi.createCinema(body)
  })
  const updateCinema = useMutation({
    mutationKey: ['cinema'],
    mutationFn: (body: Cinema) => cinemaApi.updateCinema(props.formData?._id as string, body)
  })

  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        if (props.formType === 'UPDATE') {
          const body = {
            ...defaultSubmit,
            ...props.formData,
            ...value
          }
          console.log(body)
          updateCinema.mutate(body, {
            onSuccess: () => {
              toast.success(t('update-success'))
              props.onDone()
            },
            onError: (error) => {
              toast.error((error as ErrorResponse<any>).message)
            }
          })
        } else {
          const body = {
            ...defaultSubmitWithoutId,
            ...value
          }
          createCinema.mutate(body, {
            onSuccess: () => {
              toast.success(t('create-success'))
              props.onDone()
            },
            onError: (error) => {
              toast.error((error as ErrorResponse<any>).message)
            }
          })
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
          disabled={createCinema.isLoading || updateCinema.isLoading}
        >
          {props.formType === 'UPDATE' ? t('update') : t('add-new')}
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
        <Form.Item name='name' label={t('name')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('name')} />
        </Form.Item>
        <Form.Item name='address' label={t('address')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('address')} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
