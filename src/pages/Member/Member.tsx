import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export default function Member() {
  const { t } = useTranslation('member')

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('member')} | NHCinema</title>
        <meta name='description' content={t('member-des')} />
      </Helmet>
      <div className='container'>
        <div className='flex flex-col justify-start bg-white/95 p-[20px] leading-[1.6] transition-all'>
          <div className='mb-4 text-3xl text-primary'>{t('member-title')}</div>
          <strong className='mb-2 uppercase text-primary'>{t('member-rule')}</strong>
          <strong className='mb-2 text-primary'>{t('member-1')}</strong>
          <ul className='mb-2'>
            <li>
              <span className='text-red-500'>
                <strong>{t('member-2')}</strong>
              </span>
              <em>
                <strong>
                  <span className='uppercase text-quaternary'> {t('member-3')}</span>
                </strong>
              </em>
            </li>
            <li>{t('member-4')}</li>
            <li>{t('member-5')}</li>
            <li>{t('member-6')}</li>
            <li>{t('member-7')}</li>
          </ul>
          <strong className='uppercase'>{t('member-8')}</strong>
          <p>
            {t('member-9')}
            <strong>&nbsp;{t('member-10')}</strong>&nbsp;{t('member-11')}
          </p>
          <p className='mb-2'>
            {t('member-12')} <strong>{t('member-13')}</strong> {t('member-14')}
          </p>
          <p>
            <strong>
              <span className='text-primary'>{t('member-15')}</span>
            </strong>
          </p>
          {/* <div className='w-full mt-[20px]'>
            <img
              src='https://touchcinema.com/storage/tichdiem-3112-02-1.png'
              alt=''
              className='h-full w-full object-cover'
            ></img>
          </div> */}
          <p className='my-2'>
            <strong>{t('member-16')}</strong>
          </p>
          <p>{t('member-17')}</p>
          <em>
            <ul className='mt-2 list-disc pl-[20px] font-medium'>
              <li>{t('member-18')}</li>
            </ul>
          </em>
          <p>{t('member-19')}</p>
          <p>{t('member-20')}</p>
          <em>
            <ul className='mt-2 list-disc pl-[20px] font-medium'>
              <li>{t('member-21')}</li>
            </ul>
          </em>
          <p>{t('member-22')}</p>
          <p>{t('member-23')}</p>
          <em>
            <ul className='mt-2 list-disc pl-[20px] font-medium'>
              <li>{t('member-24')}</li>
            </ul>
          </em>
          <p>{t('member-25')}</p>
          <p>{t('member-26')}</p>
          <p className='my-4'>
            <strong>{t('member-27')}</strong>
          </p>
          <p className='mb-4'>{t('member-28')}</p>
          <p>
            <strong>
              <span className='text-primary'>{t('member-29')}</span>
            </strong>
          </p>
          <p className='mt-2'>
            <strong>{t('member-30')}</strong>
          </p>
          <em>
            <ul className='mt-2 list-disc pl-[20px] font-medium'>
              <li>{t('member-31')}</li>
            </ul>
          </em>
          <p className='pl-[10px]'>{t('member-32')}</p>
          <p className='pl-[10px]'>{t('member-33')}</p>
          <p className='pl-[10px]'>{t('member-34')}</p>
          <ul className='my-2'>
            <li>{t('member-35')}</li>
            <li>{t('member-36')}</li>
            <li>{t('member-37')}</li>
            <li>{t('member-38')}</li>
            <li>{t('member-39')}</li>
            <li>{t('member-40')}</li>
            <li>{t('member-41')}</li>
          </ul>
          <p>
            <strong>
              <span className='text-primary'>{t('member-42')}</span>
            </strong>
          </p>
          <div className='my-2 w-full'>
            <img
              src='https://touchcinema.com/storage/tichdiem-3112-01.png'
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          <p className='mb-2'>
            <strong>{t('member-43')}</strong>
          </p>
          <ul>
            <li>{t('member-44')}</li>
            <li>{t('member-45')}</li>
            <li>{t('member-46')}</li>
          </ul>
          <ul className='my-2 list-disc pl-[30px]'>
            <li>{t('member-47')}</li>
            <li>{t('member-48')}</li>
            <li>{t('member-49')}</li>
            <li>{t('member-50')}</li>
            <li>{t('member-51')}</li>
            <li>{t('member-52')}</li>
            <li>{t('member-53')}</li>
            <li>{t('member-54')}</li>
            <li>{t('member-55')}</li>
            <li>{t('member-56')}</li>
            <li>{t('member-57')}</li>
            <li>{t('member-58')}</li>
            <li>
              <strong>{t('member-59')}</strong>
            </li>
            <li>
              <strong>{t('member-60')}</strong>
            </li>
          </ul>
          <ul>
            <li>{t('member-61')}</li>
            <li>{t('member-62')}</li>
            <li>{t('member-63')}</li>
            <li>{t('member-64')}</li>
            <li>{t('member-65')}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
