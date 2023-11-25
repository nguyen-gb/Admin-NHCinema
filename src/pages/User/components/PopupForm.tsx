import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Form, Input, Modal, Button, Select, DatePicker } from 'antd'
import dayjs from 'dayjs'

import { User } from 'src/types/user.type'
import userApi from 'src/apis/user.api'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import cinemaApi from 'src/apis/cinema.api'

interface Props {
  title: string
  open: boolean
  formData: User | undefined
  onDone(): void
  onCancel(): void
  formType: string
}

export const PopupForm: React.FC<Props> = (props) => {
  const { profile } = useContext(AppContext)
  const [form] = Form.useForm<User>()
  // api

  const { data } = useQuery({
    queryKey: ['cinema'],
    queryFn: cinemaApi.getCinemas
  })
  const dataCinemas = data?.data.data

  const createUser = useMutation({
    mutationKey: ['user'],
    mutationFn: (body: User) => userApi.createUser(body)
  })
  const updateUser = useMutation({
    mutationKey: ['user'],
    mutationFn: (body: User) => userApi.updateUser(props.formData?._id as string, body)
  })

  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        if (props.formType === 'UPDATE') {
          const body = {
            ...props.formData,
            ...value
          }
          console.log(body)
          updateUser.mutate(body, {
            onSuccess: () => {
              toast.success('Update thành công')
              props.onDone()
            },
            onError: (error) => {
              toast.error((error as ErrorResponse<any>).message)
            }
          })
        } else {
          const body = value.date_of_birth
            ? {
                ...value,
                date_of_birth: value.date_of_birth ? dayjs(value.date_of_birth).format('YYYY-MM-DD') : '',
                password: 'NHCinema123@',
                role: 1
              }
            : {
                ...value,
                password: 'NHCinema123@',
                role: 1
              }
          createUser.mutate(body, {
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
          ...props.formData
        }}
      >
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item name='theater_id' label='Cinema' rules={[{ required: true, message: 'Required field' }]}>
          <Select
            placeholder='Movie'
            showSearch={false}
            options={dataCinemas?.map((cinema) => {
              return {
                value: cinema._id,
                label: cinema.name
              }
            })}
          />
        </Form.Item>
        <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Email' />
        </Form.Item>
        <Form.Item name='phone' label='Phone' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Phone' />
        </Form.Item>
        <Form.Item name='gender' label='Gender'>
          <Select
            placeholder='Gender'
            showSearch={false}
            options={[
              {
                value: 'Male',
                label: 'Male'
              },
              {
                value: 'Female',
                label: 'Female'
              },
              {
                value: 'Other',
                label: 'Other'
              }
            ]}
          />
        </Form.Item>
        <Form.Item
          name='date_of_birth'
          label='Birthday'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? value.isAfter(dayjs(), 'day')
                    ? Promise.reject('Birthday must be a date in the past')
                    : Promise.resolve()
                  : Promise.resolve()
            }
          ]}
        >
          <DatePicker format='DD-MM-YYYY' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
