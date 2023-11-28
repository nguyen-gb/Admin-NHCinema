import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { Form, Input, Modal, Button, Image } from 'antd'
import { useTranslation } from 'react-i18next'

import { Banner } from 'src/types/banner.type'
import bannerApi from 'src/apis/banner.api'
import { ErrorResponse } from 'src/types/utils.type'

interface Props {
  title: string
  open: boolean
  formData: Banner | undefined
  onDone(): void
  onCancel(): void
  formType: string
}

export const PopupForm: React.FC<Props> = (props) => {
  const { t } = useTranslation('banner')
  const [form] = Form.useForm<Banner>()
  const [file, setFile] = useState(props.formData?.file ?? '')
  // api
  const createBanner = useMutation({
    mutationKey: ['banner'],
    mutationFn: (body: Banner) => bannerApi.createBanner(body)
  })
  const updateBanner = useMutation({
    mutationKey: ['banner'],
    mutationFn: (body: Banner) => bannerApi.updateBanner(props.formData?._id as string, body)
  })

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1]
        setFile(`data:${file.type};base64,${base64String}`)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        if (props.formType === 'UPDATE') {
          const body = {
            ...props.formData,
            ...value,
            file: file
          }
          console.log(body)
          updateBanner.mutate(body, {
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
            file: file
          }
          createBanner.mutate(body, {
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
          disabled={createBanner.isLoading || updateBanner.isLoading}
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
        <Form.Item name='title' label={t('title')} rules={[{ required: true, message: 'Required field' }]}>
          <Input placeholder={t('title')} />
        </Form.Item>
        <Form.Item
          name='file'
          label={t('banner')}
          rules={[
            {
              validator: () => (file ? Promise.resolve() : Promise.reject('Required field'))
            }
          ]}
        >
          <Image src={file} />
        </Form.Item>
        <Input type='file' onChange={handleOnChange}></Input>
      </Form>
    </Modal>
  )
}
