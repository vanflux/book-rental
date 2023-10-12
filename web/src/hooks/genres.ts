import { useQuery } from 'react-query'
import { getGenres } from '../services/genres'

export function useGenres() {
  return useQuery({
    queryFn: getGenres,
    queryKey: ['genres', 'list'],
  })
}
