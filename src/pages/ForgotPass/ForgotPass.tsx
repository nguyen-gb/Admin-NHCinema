import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'email' | 'password'>
const schemaLogin = schema.pick(['email', 'password'])

export default function ForgotPass() {
  const { t } = useTranslation('login')
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaLogin)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })
  const onSubmit = handleSubmit((body) => {
    loginMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate(path.home)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('forgot-password')} | NHCinema</title>
        <meta name='description' content={t('forgot-password-des')} />
      </Helmet>
      <div className='container text-quaternary'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-10 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-4 lg:col-start-4'>
            <form className='rounded-[15px] bg-white p-10 shadow-ct shadow-white/30' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>{t('forgot-password')}</div>
              <Input
                className='mt-8'
                type='email'
                placeholder={t('email')}
                name='email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <div className='mt-2'>
                <Button
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                  type='submit'
                  className='flex w-full items-center justify-center rounded-[15px] bg-primary bg-opacity-70 px-2 py-4 text-center text-sm uppercase text-white hover:cursor-pointer hover:bg-primary'
                >
                  {t('send')}
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <Link to={path.login} className='text-quaternary/50 hover:text-quaternary'>
                  {t('login')}
                </Link>
                <span className='ml-1 text-quaternary'>/</span>
                <Link to={path.register} className='ml-1 text-quaternary/50 hover:text-quaternary'>
                  {t('register')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
