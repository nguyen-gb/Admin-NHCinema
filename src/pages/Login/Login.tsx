import { Button, Col, Form, Image, Input, Row, Spin, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import * as Icon from '@ant-design/icons'
import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import logo from 'src/assets/images/nhcinema-logo.png'
import background from 'src/assets/images/background.jpg'
import { AppContext } from 'src/contexts/app.context'
import authApi from 'src/apis/auth.api'
import path from 'src/constants/path'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { setCinemaFromLS } from 'src/utils/auth'

type FormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const { t } = useTranslation('login')
  const [form] = Form.useForm()
  const buttonSubmitHtml = useRef<HTMLElement | null>(null)
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })

  // handle ENTER action
  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && buttonSubmitHtml.current) {
      buttonSubmitHtml.current.click()
    }
  }

  const handleSubmit = () => {
    form
      .validateFields()
      .then((body) => {
        loginMutation.mutate(body, {
          onSuccess: (data) => {
            setIsAuthenticated(true)
            setProfile(data.data.data.user)
            setCinemaFromLS(data.data.data.theater)
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
        <title>{t('login')} | NHCinema</title>
        <meta name='description' content={t('login-des')} />
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
                    Login
                  </Typography.Title>
                </Spin>
              </Form.Item>
              <Form.Item
                name='email'
                rules={[{ required: true, message: 'Required field' }]}
                style={{ marginBottom: 24 }}
              >
                <Input
                  prefix={<Icon.UserOutlined />}
                  onKeyDownCapture={handleInputKeyDown}
                  placeholder='Username'
                  size='large'
                ></Input>
              </Form.Item>
              <Form.Item
                name='password'
                rules={[{ required: true, message: 'Required field' }]}
                style={{ marginBottom: 24 }}
              >
                <Input.Password
                  size='large'
                  prefix={<Icon.LockOutlined />}
                  onKeyDownCapture={handleInputKeyDown}
                  placeholder='***********'
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
                Login
              </Button>
            </Form>
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
