import React, { useContext, useEffect } from 'react'
import { Form, Modal, Button, Select, DatePicker, Row, Col, TimePicker } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { Showtime, ShowtimeCreate } from 'src/types/showtime.type'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import movieApi from 'src/apis/movie.api'
import showtimeApi from 'src/apis/showtime.api'
import { Movie } from 'src/types/movie.type'
import roomApi from 'src/apis/room.api'
import { Room } from 'src/types/room.type'

interface Props {
  title: string
  open: boolean
  formData: Showtime | undefined
  onDone(): void
  onCancel(): void
  formType: string
}

export const PopupForm: React.FC<Props> = (props) => {
  const { t } = useTranslation('showtimes')
  const { profile } = useContext(AppContext)
  const [form] = Form.useForm<ShowtimeCreate>()

  const { data: dataMovies } = useQuery({
    queryKey: ['movie'],
    queryFn: () => {
      return movieApi.getMovies()
    }
  })
  const movies = dataMovies?.data.data as Movie[]

  const { data: dataRoom } = useQuery({
    queryKey: ['room'],
    queryFn: () => roomApi.getRooms()
  })
  const rooms = dataRoom?.data.data as Room[]

  // api
  const createShowtime = useMutation({
    mutationKey: ['showtime'],
    mutationFn: (body: ShowtimeCreate) => showtimeApi.createShowtime(body)
  })
  const updateShowtime = useMutation({
    mutationKey: ['showtime'],
    mutationFn: (body: ShowtimeCreate) => showtimeApi.updateShowtime(props.formData?._id as string, body)
  })

  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        console.log(value)
        if (props.formType === 'UPDATE') {
          const body = {
            movie_id: value.movie_id,
            room_id: value.room_id,
            time: (value.time as any).format('YYYY-MM-DD'),
            showtime: (value.showtime as any).format('HH:mm'),
            _id: props.formData?._id as string,
            theater_id: profile?.theater_id as string
          }
          updateShowtime.mutate(body, {
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
            movie_id: value.movie_id,
            room_id: value.room_id,
            time: (value.time as any).format('YYYY-MM-DD'),
            showtime: (value.showtime as any).format('HH:mm'),
            _id: props.formData?._id as string,
            theater_id: profile?.theater_id as string
          }
          createShowtime.mutate(body, {
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
          loading={createShowtime.isLoading || updateShowtime.isLoading}
        >
          {props.formType === 'UPDATE' ? t('update') : t('add-new')}
        </Button>
      ]}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={
          props.formData
            ? {
                _id: props.formData._id,
                room_id: props.formData.room_id,
                movie_id: props.formData.movie_id,
                time: dayjs(props.formData.time, 'YYYY-MM-DD'),
                showtime: dayjs(props.formData.showtime, 'HH:mm')
              }
            : {}
        }
      >
        <Form.Item name='movie_id' label={t('movie')} rules={[{ required: true, message: t('required-field') }]}>
          <Select
            placeholder={t('movie')}
            showSearch={false}
            options={movies?.map((movie) => {
              return {
                value: movie._id,
                label: movie.name
              }
            })}
          />
        </Form.Item>
        <Form.Item name='room_id' label={t('room')} rules={[{ required: true, message: t('required-field') }]}>
          <Select
            placeholder={t('room')}
            showSearch={false}
            options={rooms?.map((room) => {
              return {
                value: room._id,
                label: room.room_number
              }
            })}
          />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              name='time'
              label={t('date')}
              rules={[
                { required: true, message: t('required-field') },
                {
                  validator: (_, value) =>
                    value.isBefore(dayjs().add(4, 'days'), 'day') ? Promise.reject(t('rule-date')) : Promise.resolve()
                }
              ]}
            >
              <DatePicker format='DD-MM-YYYY' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='showtime' label={t('time')} rules={[{ required: true, message: t('required-field') }]}>
              <TimePicker format='HH:mm' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
