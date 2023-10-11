import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import useQueryConfig, { QueryConfig } from './useQueryConfig'
import path from 'src/constants/path'
import { MovieSchema, movieSchema } from 'src/utils/rules'

export default function useSearchProducts() {
  const queryConfig: QueryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<MovieSchema>({
    defaultValues: {
      movie: ''
    },
    resolver: yupResolver(movieSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    const config = {
      ...queryConfig,
      key_search: data.movie
    }
    navigate({
      pathname: path.movie,
      search: createSearchParams(config).toString()
    })
  })

  return { onSubmitSearch, register }
}
