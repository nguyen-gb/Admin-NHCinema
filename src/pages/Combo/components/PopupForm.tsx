import React, { useContext, useEffect } from 'react'
import { Form, Input, Modal, Button, Select } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Combo, comboType } from 'src/types/combo.type'
import comboApi from 'src/apis/combo.api'
import { ErrorResponse } from 'src/types/utils.type'

interface Props {
  title: string
  open: boolean
  formData: Combo | undefined
  onDone(): void
  onCancel(): void
  formType: string
}

export const PopupForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm<Combo>()
  // api
  const createCombo = useMutation({
    mutationKey: ['combo'],
    mutationFn: (body: Combo) => comboApi.createCombo(body)
  })
  const updateCombo = useMutation({
    mutationKey: ['combo'],
    mutationFn: (body: Combo) => comboApi.updateCombo(props.formData?._id as string, body)
  })

  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        if (props.formType === 'UPDATE') {
          const body = {
            ...props.formData,
            ...value,
            price: Number(value.price)
          }
          console.log(body)
          updateCombo.mutate(body, {
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
            ...value,
            price: Number(value.price)
          }
          createCombo.mutate(body, {
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
        <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Description' />
        </Form.Item>
        <Form.Item
          name='price'
          label='Price'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? value < 0
                    ? Promise.reject('Price must be greater than or equal to 0')
                    : Promise.resolve()
                  : Promise.reject('Required field')
            }
          ]}
        >
          <Input type='number' min={0} placeholder='Price' />
        </Form.Item>
        <Form.Item name='type' label='Type' rules={[{ required: true, message: 'Required field' }]}>
          <Select
            placeholder='Type'
            showSearch={false}
            options={comboType.map((combo, index) => {
              return {
                value: index + 1,
                label: combo
              }
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
