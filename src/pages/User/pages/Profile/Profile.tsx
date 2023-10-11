import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import userApi from 'src/apis/user.api'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { UserSchema, userSchema } from 'src/utils/rules'
import DateSelect from '../../components/DateSelect'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import path from 'src/constants/path'

type FormData = Pick<UserSchema, 'name' | 'address' | 'avatar' | 'phone' | 'date_of_birth'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'address', 'avatar', 'phone', 'date_of_birth'])

export default function Profile() {
  const { t } = useTranslation('user')
  const [file, setFile] = useState<File>()
  // const previewImage = useMemo(() => {
  //   return file ? URL.createObjectURL(file) : ''
  // }, [file])
  const { setProfile } = useContext(AppContext)
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = methods

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  const avatar = watch('avatar')

  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('address', profile.address)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  // const handleChangeFile = (file?: File) => {
  //   setFile(file)
  // }

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('my-account')} | NHCinema</title>
        <meta name='description' content={t('my-account-des')} />
      </Helmet>
      <div className='container text-white'>
        <div className='my-[40px]'>
          <div className='mt-10'>
            <div>
              <div className='mx-auto max-w-4xl'>
                <form className='space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0' onSubmit={onSubmit}>
                  <div className='w-full space-y-2'>
                    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {t('full-name')}
                    </p>
                    <Input
                      className='text-quaternary'
                      register={register}
                      name='name'
                      placeholder={t('full-name')}
                      errorMessage={errors.name?.message}
                    ></Input>
                  </div>
                  <div className='w-full space-y-2'>
                    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {t('email')}
                    </p>
                    <input
                      className='w-full rounded-[10px] border border-quaternary/20 p-3 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-quaternary focus:shadow-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                      placeholder={t('email')}
                      disabled
                      value={profile?.email}
                    ></input>
                  </div>
                  <div className='w-full space-y-2'>
                    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {t('phone')}
                    </p>
                    <Controller
                      control={control}
                      name='phone'
                      render={({ field }) => (
                        <InputNumber
                          classNameInput='w-full text-quaternary rounded-[10px] border border-quaternary/20 p-3 outline-none focus:border-quaternary focus:shadow-sm'
                          placeholder={t('phone')}
                          errorMessage={errors.phone?.message}
                          {...field}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className='w-full space-y-2'>
                    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {t('gender')}
                    </p>
                    <select
                      className='w-full rounded-[10px] border border-quaternary/20 p-[10px] text-quaternary outline-none focus:border-quaternary focus:shadow-sm'
                      {...register}
                      name='sex'
                      placeholder={t('gender')}
                    >
                      <option value='male'>{t('male')}</option>
                      <option value='female'>{t('female')}</option>
                      <option value='other'>{t('other')}</option>
                    </select>
                  </div>
                  <div className='w-full space-y-2'>
                    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {t('date-of-birth')}
                    </p>
                    <Controller
                      control={control}
                      name='date_of_birth'
                      render={({ field }) => (
                        <DateSelect
                          errorMessage={errors.date_of_birth?.message}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className='col-span-2 flex justify-end gap-4 pt-4'>
                    <Link
                      to={path.changePassword}
                      className='inline-flex h-10 items-center justify-center rounded-full border bg-transparent px-8 py-2 text-center text-sm font-medium transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                    >
                      {t('change-password')}
                    </Link>
                    <button className='inline-flex h-10 items-center justify-center rounded-full bg-primary px-8 py-2 text-center text-sm font-medium transition duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                      {t('save-information')}
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
