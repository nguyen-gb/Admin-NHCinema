import React from 'react'
import { Form, Input, Modal, Button } from 'antd'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

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
              toast.success('Update thành công')
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
              toast.success('Create thành công')
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
        <Form.Item name='address' label='Address' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Address' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
