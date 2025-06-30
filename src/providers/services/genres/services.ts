import { baseApi } from '@/support'
import { parseHttpErrors } from '@/providers/utils/parsers'
// import type { iGetMoviesFilters, iGetMoviesResponse } from './types'

class GetMovieGenresList {
  static async execute(): Promise<any> {
    try {
      const { data } = await baseApi.get(`/genre/movie/list?language=pt-BR`)

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(parseHttpErrors(error))
    }
  }
}

export { GetMovieGenresList }
