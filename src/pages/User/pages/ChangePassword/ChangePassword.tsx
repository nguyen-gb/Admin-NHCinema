import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import userApi from 'src/apis/user.api'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { ErrorResponse } from 'src/types/utils.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const { t } = useTranslation('user')
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const updateProfileMutation = useMutation(userApi.updateProfile)

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
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

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('change-password')} | NHCinema</title>
        <meta name='description' content={t('change-password-des')} />
      </Helmet>
      <div className='container text-white'>
        <div className='my-[40px]'>
          <div className='mt-10'>
            <div>
              <div className='mx-auto max-w-xl'>
                <form className='space-y-6 md:space-y-0' onSubmit={onSubmit}>
                  <div className='w-full space-y-2'>
                    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {t('current-password')}
                    </p>
                    <Input
                      register={register}
                      name='password'
                      type='password'
                      placeholder={t('current-password')}
                      errorMessage={errors.password?.message}
                      className='text-quaternary'
                      classNameEye='absolute right-[5px] top-[13px] h-5 w-5 cursor-pointer'
                    ></Input>
                  </div>
                  <div className='w-full space-y-2'>
                    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {t('new-password')}
                    </p>
                    <Input
                      register={register}
                      name='new_password'
                      type='password'
                      placeholder={t('new-password')}
                      errorMessage={errors.new_password?.message}
                      className='text-quaternary'
                      classNameEye='absolute right-[5px] top-[13px] h-5 w-5 cursor-pointer'
                    ></Input>
                  </div>
                  <div className='w-full space-y-2'>
                    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {t('confirm-new-password')}
                    </p>
                    <Input
                      register={register}
                      name='confirm_password'
                      type='password'
                      placeholder={t('confirm-new-password')}
                      errorMessage={errors.confirm_password?.message}
                      className='text-quaternary'
                      classNameEye='absolute right-[5px] top-[13px] h-5 w-5 cursor-pointer'
                    ></Input>
                  </div>
                  <div className='flex justify-end gap-4 pt-4'>
                    <Link
                      to={path.profile}
                      className='inline-flex h-10 items-center justify-center rounded-full border bg-transparent px-8 py-2 text-sm font-medium transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                    >
                      {t('back')}
                    </Link>
                    <button className='inline-flex h-10 items-center justify-center rounded-full bg-primary px-8 py-2 text-sm font-medium transition duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                      {t('save')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <span id='headlessui-tabs-panel-:rj:' role='tabpanel' aria-labelledby='headlessui-tabs-tab-:rc:'></span>
          </div>
        </div>
      </div>
    </div>
  )
}
