import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Form, Input, Modal, Button, Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { User } from 'src/types/user.type'
import userApi from 'src/apis/user.api'
import { ErrorResponse } from 'src/types/utils.type'
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
  const { t } = useTranslation('user')
  const [form] = Form.useForm<User>()
  // api

  const { data } = useQuery({
    queryKey: ['cinema'],
    queryFn: () => cinemaApi.getCinemas()
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
              toast.success(t('update-success'))
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
          loading={createUser.isLoading || updateUser.isLoading}
        >
          {props.formType === 'UPDATE' ? t('update') : t('add-new')}
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
        <Form.Item name='name' label={t('full-name')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('full-name')} />
        </Form.Item>
        <Form.Item name='theater_id' label={t('cinema')} rules={[{ required: true, message: t('required-field') }]}>
          <Select
            placeholder={t('cinema')}
            showSearch={false}
            options={dataCinemas?.map((cinema) => {
              return {
                value: cinema._id,
                label: cinema.name
              }
            })}
          />
        </Form.Item>
        <Form.Item name='email' label={t('email')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('email')} />
        </Form.Item>
        <Form.Item name='phone' label={t('phone')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('phone')} />
        </Form.Item>
        <Form.Item name='gender' label={t('gender')}>
          <Select
            placeholder={t('gender')}
            showSearch={false}
            options={[
              {
                value: 'Male',
                label: t('male')
              },
              {
                value: 'Female',
                label: t('female')
              },
              {
                value: 'Other',
                label: t('other')
              }
            ]}
          />
        </Form.Item>
        <Form.Item
          name='date_of_birth'
          label={t('date-of-birth')}
          rules={[
            { required: true, message: t('required-field') },
            {
              validator: (_, value) =>
                value.isAfter(dayjs(), 'day')
                  ? Promise.reject('Birthday must be a date in the past')
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
