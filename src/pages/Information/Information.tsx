import { useMutation } from '@tanstack/react-query'
import { Button, Card, Col, DatePicker, Form, Input, Row, Spin } from 'antd'
import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import userApi from 'src/apis/user.api'
import { AppContext } from 'src/contexts/app.context'
import { User } from 'src/types/user.type'
import { ErrorResponse } from 'src/types/utils.type'
import { setProfileToLS } from 'src/utils/auth'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export default function InformationPage() {
  const { t } = useTranslation('user')
  const { profile, setProfile, cinema } = useContext(AppContext)
  const [isVerticalLayout, setIsVerticalLayout] = useState<boolean>(false)
  const [form] = Form.useForm()

  const updateMutation = useMutation({
    mutationFn: (body: User) => userApi.updateUser(profile?._id as string, body)
  })

  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        console.log(value)
        const body = {
          ...profile,
          ...value,
          date_of_birth: dayjs(value.date_of_birth).format('YYYY-MM-DD')
        }
        updateMutation.mutate(body, {
          onSuccess: (data) => {
            setProfile(data.data.data)
            setProfileToLS(data.data.data)
            toast.success(t('update-success'))
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
    <Spin spinning={updateMutation.isLoading}>
      <Card className='setting-override' title={t('personal-information')}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Form
              layout={isVerticalLayout ? 'vertical' : 'horizontal'}
              form={form}
              initialValues={{
                ...profile,
                cinema: cinema?.name,
                date_of_birth: dayjs(profile?.date_of_birth, 'DD/MM/YYYY')
              }}
            >
              <Row>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 16, offset: 4 }}
                  xl={{ span: 12, offset: 6 }}
                >
                  {profile?.role === 1 && (
                    <Form.Item
                      label={t('cinema')}
                      name='cinema'
                      colon={false}
                      style={{ marginBottom: 24 }}
                      labelCol={{ sm: 24, md: 6 }}
                      labelAlign='right'
                      rules={[
                        {
                          required: true,
                          message: t('required-field')
                        }
                      ]}
                    >
                      <Input placeholder={t('cinema')} disabled />
                    </Form.Item>
                  )}
                  <Form.Item
                    label={t('email')}
                    name='email'
                    colon={false}
                    style={{ marginBottom: 24 }}
                    labelCol={{ sm: 24, md: 6 }}
                    labelAlign='right'
                    rules={[
                      {
                        required: true,
                        message: t('required-field')
                      },
                      {
                        type: 'email',
                        message: t('rule-email')
                      }
                    ]}
                  >
                    <Input placeholder={t('email')} type='email' disabled />
                  </Form.Item>
                  <Form.Item
                    label={t('full-name')}
                    name='name'
                    colon={false}
                    labelCol={{ sm: 24, md: 6 }}
                    labelAlign='right'
                    style={{ marginBottom: 24 }}
                    rules={[
                      {
                        required: true,
                        message: t('required-field')
                      }
                    ]}
                  >
                    <Input placeholder={t('full-name')} />
                  </Form.Item>
                  <Form.Item
                    label={t('phone')}
                    name='phone'
                    colon={false}
                    style={{ marginBottom: 24 }}
                    labelCol={{ sm: 24, md: 6 }}
                    labelAlign='right'
                    rules={[
                      {
                        required: true,
                        message: t('required-field')
                      },
                      {
                        pattern:
                          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                        message: t('rule-phone')
                      }
                    ]}
                  >
                    <Input placeholder={t('phone')} />
                  </Form.Item>
                  <Form.Item
                    label={t('date-of-birth')}
                    name='date_of_birth'
                    colon={false}
                    style={{ marginBottom: 24 }}
                    labelCol={{ sm: 24, md: 6 }}
                    labelAlign='right'
                    rules={[
                      {
                        required: true,
                        message: t('required-field')
                      }
                    ]}
                  >
                    <DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
                  </Form.Item>
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
                      <Button block type='primary' onClick={handleSubmit} loading={updateMutation.isLoading}>
                        {t('save')}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </Spin>
  )
}
