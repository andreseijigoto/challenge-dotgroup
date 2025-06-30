import { type iMovie } from '@/providers/services'

export const state = {
  genres: [],
  query: '',
  moviePage: 1,
  movieList: [] as iMovie[],
  totalPages: 1,
  totalResults: 0
}
