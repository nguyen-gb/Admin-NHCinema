import { ProductListConfig } from 'src/types/product.type'
import useQueryParams from './useQueryParams'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig(args?: ProductListConfig) {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      genre_id: args?.genre_id || queryParams.genre_id,
      status: args?.status || queryParams.status,
      key_search: args?.key_search || queryParams.key_search
    },
    isUndefined
  )
  return queryConfig
}
