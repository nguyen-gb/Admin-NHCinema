import { useSearchParams } from 'react-router-dom'

export default function useQueryParams() {
  const [searchparams] = useSearchParams()

  return Object.fromEntries([...searchparams])
}
