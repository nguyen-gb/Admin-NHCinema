import { Button, Card, Col, Form, Input, Row } from 'antd'
import { useEffect, useState } from 'react'
import * as Icon from '@ant-design/icons'
import { NamePath } from 'antd/es/form/interface'
import { RuleObject } from 'antd/lib/form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import userApi from 'src/apis/user.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'

export default function ChangePassword() {
  const [isVerticalLayout, setIsVerticalLayout] = useState<boolean>(false)
  const [form] = Form.useForm()

  const updateMutation = useMutation({
    mutationFn: (body: { password: string; new_password: string; password_confirm: string }) =>
      userApi.changePassword(body)
  })

  const confirmPasswordValidator = ({ getFieldValue }: { getFieldValue: (name: NamePath) => any }) => ({
    validator(_: RuleObject, value: string) {
      if (getFieldValue('new_password') === value || (!getFieldValue('new_password') && !value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error("Confirm password doesn't match your password"))
    }
  })

  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        updateMutation.mutate(value, {
          onSuccess: () => {
            toast.success('Update success')
          },
          onError: (error) => {
            if (isAxiosUnprocessableEntityError<ErrorResponse<string[]>>(error)) {
              const formError = error.response?.data.data
              if (formError) {
                Object.keys(formError).forEach((key) => {
                  form.setFields([
                    {
                      name: key,
                      errors: [formError[key as keyof string[]] as string]
                    }
                  ])
                })
              } else {
                toast.error(error.response?.data.message)
              }
            }
          }
        })
      })
      .catch(
        (err) =>
          new Promise((resolve) => {
            setTimeout(() => resolve(err), 200)
            console.log(err)
          })
      )
  }

  useEffect(() => {
    const handleResize = () => {
      setIsVerticalLayout(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth])

  return (
    <Card className='setting-override' title='Change Password'>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Form layout={isVerticalLayout ? 'vertical' : 'horizontal'} form={form}>
            <Row>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 24, offset: 0 }}
                lg={{ span: 18, offset: 3 }}
                xl={{ span: 12, offset: 6 }}
              >
                <Form.Item
                  label='Current password'
                  name='password'
                  colon={false}
                  labelCol={{ sm: 24, md: 8, lg: 8 }}
                  labelAlign='right'
                  style={{ marginBottom: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Required field'
                    }
                  ]}
                >
                  <Input.Password
                    placeholder='********'
                    iconRender={(visible) => (visible ? <Icon.EyeTwoTone /> : <Icon.EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <Form.Item
                  label='New password'
                  name='new_password'
                  colon={false}
                  style={{ marginBottom: 24 }}
                  labelCol={{ sm: 24, md: 8, lg: 8 }}
                  labelAlign='right'
                  rules={[
                    {
                      required: true,
                      message: 'Required field'
                    }
                  ]}
                >
                  <Input.Password
                    placeholder='********'
                    iconRender={(visible) => (visible ? <Icon.EyeTwoTone /> : <Icon.EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <Form.Item
                  label='Confirm password'
                  name='password_confirm'
                  dependencies={['newPassword']}
                  colon={false}
                  labelCol={{ sm: 24, md: 8, lg: 8 }}
                  labelAlign='right'
                  rules={[
                    {
                      required: true,
                      message: 'Required field'
                    },
                    confirmPasswordValidator
                  ]}
                >
                  <Input.Password
                    placeholder='********'
                    iconRender={(visible) => (visible ? <Icon.EyeTwoTone /> : <Icon.EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24}>
          <Row>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 16, offset: 8 }}
              lg={{ span: 12, offset: 9 }}
              xl={{ span: 8, offset: 10 }}
            >
              <Button block type='primary' onClick={handleSubmit} loading={false}>
                Save
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
