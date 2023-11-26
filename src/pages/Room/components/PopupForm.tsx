import React, { useContext, useEffect } from 'react'
import { Form, Input, Modal, Button } from 'antd'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { Room } from 'src/types/room.type'
import roomApi from 'src/apis/room.api'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  title: string
  open: boolean
  formData: Room | undefined
  onDone(): void
  onCancel(): void
  formType: string
}

const defaultSubmit: Room = {
  _id: '',
  theater_id: '',
  room_number: '',
  seat_capacity: 84
}

const defaultSubmitWithoutId = omit(defaultSubmit, '_id')

export const PopupForm: React.FC<Props> = (props) => {
  const { profile } = useContext(AppContext)
  const [form] = Form.useForm<Room>()
  // api
  const createRoom = useMutation({
    mutationKey: ['room'],
    mutationFn: (body: Room) => roomApi.createRoom(body)
  })
  const updateRoom = useMutation({
    mutationKey: ['room'],
    mutationFn: (body: Room) => roomApi.updateRoom(props.formData?._id as string, body)
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
          updateRoom.mutate(body, {
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
            ...value,
            theater_id: profile?.theater_id as string
          }
          createRoom.mutate(body, {
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
          ...defaultSubmit,
          ...props.formData
        }}
      >
        <Form.Item name='room_number' label='Name' rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder='Name' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
