import { useQuery } from 'react-query'
import { getLanguages } from '../services/languages'

export function useLanguages() {
  return useQuery({
    queryFn: getLanguages,
    queryKey: ['languages', 'list'],
  })
}
