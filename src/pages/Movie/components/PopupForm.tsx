import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Modal, Button, DatePicker, Select, Image, InputRef } from 'antd'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as Icon from '@ant-design/icons'
import dayjs from 'dayjs'

import { Movie } from 'src/types/movie.type'
import movieApi from 'src/apis/movie.api'
import { ErrorResponse } from 'src/types/utils.type'
import genreApi from 'src/apis/genre.api'
import { Genre } from 'src/types/genre.type'

interface Props {
  title: string
  open: boolean
  formData: Movie | undefined
  onDone(): void
  onCancel(): void
  formType: string
}

export const PopupForm: React.FC<Props> = (props) => {
  const { t } = useTranslation('movie')
  const [form] = Form.useForm<Movie>()

  const [urlPoster, setUrlPoster] = useState<string>((props.formData?.poster as string) ?? '')
  const [poster, setPoster] = useState<File>()
  const posterRef = useRef<InputRef>(null)

  const [urlThumbnail, setUrlThumbnail] = useState<string>((props.formData?.poster as string) ?? '')
  const [thumbnail, setThumbnail] = useState<File>()
  const thumbnailRef = useRef<InputRef>(null)

  // api
  const { data: dataGenre } = useQuery({
    queryKey: ['genre'],
    queryFn: genreApi.getGenres
  })
  const genres = dataGenre?.data.data as Genre[]

  const createMovie = useMutation({
    mutationKey: ['movie'],
    mutationFn: (body: Movie) => movieApi.createMovie(body)
  })
  const updateMovie = useMutation({
    mutationKey: ['movie'],
    mutationFn: (body: Movie) => movieApi.updateMovie(props.formData?._id as string, body)
  })

  const handleOnChangePoster = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setPoster(file)
      const reader = new FileReader()

      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1]
        setUrlPoster(`data:${file.type};base64,${base64String}`)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleOnChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setThumbnail(file)
      const reader = new FileReader()

      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1]
        setUrlThumbnail(`data:${file.type};base64,${base64String}`)
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
            english_name: value.english_name ? value.english_name : '',
            poster: poster,
            thumbnail: thumbnail,
            release: dayjs(value.release).format('YYYY-MM-DD'),
            genres: (value.genres as string[]).join(', ')
          }
          updateMovie.mutate(body, {
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
            english_name: value.english_name ? value.english_name : '',
            poster: poster as File,
            thumbnail: thumbnail as File,
            release: dayjs(value.release).format('YYYY-MM-DD'),
            genres: (value.genres as string[]).join(', ')
          }
          createMovie.mutate(body, {
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
      setUrlPoster('')
      setUrlThumbnail('')
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
          loading={createMovie.isLoading || updateMovie.isLoading}
        >
          {props.formType === 'UPDATE' ? t('update') : t('add-new')}
        </Button>
      ]}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          ...props?.formData,
          genres: props.formData?.genre_ids ?? [],
          release: dayjs(props.formData?.release as string, 'DD/MM/YYYY') ?? dayjs('DD/MM/YYYY')
        }}
      >
        <Form.Item name='name' label={t('name')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('name')} />
        </Form.Item>
        <Form.Item name='english_name' label={t('english-name')}>
          <Input placeholder={t('english-name')} />
        </Form.Item>
        <Form.Item
          required
          name='poster'
          label={t('poster')}
          rules={[
            {
              validator: () => (urlPoster ? Promise.resolve() : Promise.reject(t('required-field')))
            }
          ]}
        >
          <Image src={urlPoster} />
          <Input ref={posterRef} type='file' onChange={handleOnChangePoster} style={{ display: 'none' }}></Input>
          <Button
            icon={<Icon.DownloadOutlined />}
            onClick={() => posterRef.current?.input?.click()}
            style={{ width: '100%', marginTop: 10 }}
            loading={createMovie.isLoading || updateMovie.isLoading}
          >
            {t('upload')}
          </Button>
        </Form.Item>
        <Form.Item
          required
          name='thumbnail'
          label={t('thumbnail')}
          rules={[
            {
              validator: () => (urlThumbnail ? Promise.resolve() : Promise.reject(t('required-field')))
            }
          ]}
        >
          <Image src={urlThumbnail} />
          <Input ref={thumbnailRef} type='file' onChange={handleOnChangeThumbnail} style={{ display: 'none' }}></Input>
          <Button
            icon={<Icon.DownloadOutlined />}
            onClick={() => thumbnailRef.current?.input?.click()}
            style={{ width: '100%', marginTop: 10 }}
            loading={createMovie.isLoading || updateMovie.isLoading}
          >
            {t('upload')}
          </Button>
        </Form.Item>
        <Form.Item name='trailer' label={t('trailer')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('trailer')} />
        </Form.Item>
        <Form.Item name='duration' label={t('duration')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('duration')} />
        </Form.Item>
        <Form.Item name='release' label={t('release')} rules={[{ required: true, message: t('required-field') }]}>
          <DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item name='genres' label={t('genres')} rules={[{ required: true, message: t('required-field') }]}>
          <Select
            placeholder={t('genres')}
            mode='multiple'
            showSearch={false}
            options={genres?.map((genre) => {
              return {
                value: genre._id,
                label: genre.name
              }
            })}
          />
        </Form.Item>
        <Form.Item name='director' label={t('director')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('director')} />
        </Form.Item>
        <Form.Item name='performer' label={t('performer')} rules={[{ required: true, message: t('required-field') }]}>
          <Input placeholder={t('performer')} />
        </Form.Item>
        <Form.Item
          name='description'
          label={t('description')}
          rules={[{ required: true, message: t('required-field') }]}
        >
          <Input.TextArea placeholder={t('description')} />
        </Form.Item>
        <Form.Item name='format' label={t('format')} rules={[{ required: true, message: t('required-field') }]}>
          <Select
            placeholder={t('format')}
            showSearch={false}
            options={[
              {
                value: '2D',
                label: '2D'
              },
              {
                value: '3D',
                label: '3D'
              }
            ]}
          />
        </Form.Item>
        <Form.Item name='age' label={t('age')} rules={[{ required: true, message: t('required-field') }]}>
          <Select
            placeholder={t('age')}
            showSearch={false}
            options={[
              {
                value: 'P',
                label: 'P'
              },
              {
                value: 'T13',
                label: 'T13'
              },
              {
                value: 'T16',
                label: 'T16'
              },
              {
                value: 'T18',
                label: 'T18'
              }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
