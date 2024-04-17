import React, { useEffect } from 'react'
import { Form, Input, Modal, Button, Select } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('combo')
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
              toast.success(t('update-success'))
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
          loading={createCombo.isLoading || updateCombo.isLoading}
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
        <Form.Item name='name' label={t('name')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('name')} />
        </Form.Item>
        <Form.Item
          name='description'
          label={t('description')}
          rules={[{ required: true, message: t('required-field') }]}
        >
          <Input placeholder={t('description')} />
        </Form.Item>
        <Form.Item
          name='price'
          label={t('price')}
          rules={[
            { required: true, message: t('required-field') },
            {
              validator: (_, value) => (value < 0 ? Promise.reject(t('rule-price')) : Promise.resolve())
            }
          ]}
        >
          <Input type='number' min={0} placeholder={t('price')} />
        </Form.Item>
        <Form.Item
          name='exchange_point'
          label={t('exchange-point')}
          rules={[
            { required: true, message: t('required-field') },
            {
              validator: (_, value) => (value < 0 ? Promise.reject(t('rule-exchange-point')) : Promise.resolve())
            }
          ]}
        >
          <Input type='number' min={0} placeholder={t('exchange-point')} />
        </Form.Item>
        <Form.Item name='type' label={t('type')} rules={[{ required: true, message: t('required-field') }]}>
          <Select
            placeholder={t('type')}
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
