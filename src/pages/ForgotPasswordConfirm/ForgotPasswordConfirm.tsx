import { Button, Col, Form, Image, Input, Row, Spin, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import * as Icon from '@ant-design/icons'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { RuleObject } from 'antd/lib/form'
import { NamePath } from 'antd/es/form/interface'

import logo from 'src/assets/images/nhcinema-logo.png'
import background from 'src/assets/images/background.jpg'
import authApi from 'src/apis/auth.api'
import path from 'src/constants/path'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { ForgotPassConfirm } from 'src/types/auth.type'

export default function ForgotPasswordConfirm() {
  const { _id } = useParams()
  const { t } = useTranslation('login')
  const [form] = Form.useForm()
  const buttonSubmitHtml = useRef<HTMLElement | null>(null)
  const navigate = useNavigate()

  const forgotPassMutation = useMutation({
    mutationFn: (body: ForgotPassConfirm) => authApi.forgotPassConfirm({ ...body, user_id: _id as string })
  })

  // handle ENTER action
  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && buttonSubmitHtml.current) {
      buttonSubmitHtml.current.click()
    }
  }

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
      .then((body) => {
        forgotPassMutation.mutate(body, {
          onSuccess: () => {
            navigate(path.home)
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
      .catch((err) => console.log(err))
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        padding: 80,
        background: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Helmet>
        <title>{t('forgot-password')} | NHCinema</title>
        <meta name='description' content={t('forgot-password-des')} />
      </Helmet>
      <Row
        style={{
          height: '100%',
          justifyContent: 'end',
          alignItems: 'center'
        }}
      >
        <Col xl={{ span: 6 }}>
          <Spin spinning={false} indicator={<Icon.LoadingOutlined />} style={{ display: 'block' }}>
            <Form form={form}>
              <Form.Item>
                <Spin spinning={false} size='small' style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image src={logo} preview={false}></Image>
                </Spin>
              </Form.Item>
              <Form.Item>
                <Spin spinning={false} size='small'>
                  <Typography.Title level={4} style={{ marginBottom: 0 }}>
                    Forgot Password
                  </Typography.Title>
                </Spin>
              </Form.Item>
              <Form.Item
                name='otp'
                rules={[{ required: true, message: 'Required field' }]}
                style={{ marginBottom: 24 }}
              >
                <Input
                  prefix={<Icon.UserOutlined />}
                  onKeyDownCapture={handleInputKeyDown}
                  placeholder='OTP'
                  size='large'
                ></Input>
              </Form.Item>
              <Form.Item
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
                  prefix={<Icon.LockOutlined />}
                  placeholder='New password'
                  iconRender={(visible) => (visible ? <Icon.EyeTwoTone /> : <Icon.EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Form.Item
                name='confirm_password'
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
                  prefix={<Icon.LockOutlined />}
                  placeholder='Confirm password'
                  iconRender={(visible) => (visible ? <Icon.EyeTwoTone /> : <Icon.EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Button
                ref={buttonSubmitHtml}
                type='primary'
                block={true}
                size='large'
                loading={false}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Form>
            <Button type='link' style={{ paddingLeft: 0 }} onClick={() => navigate(path.login)}>
              Login
            </Button>
          </Spin>
          <Typography.Text
            style={{
              textAlign: 'center',
              color: '#777',
              marginTop: 40,
              display: 'block'
            }}
          >
            Copyright ©2023, Developed by Nguyen & Hai
          </Typography.Text>
        </Col>
      </Row>
    </div>
  )
}
