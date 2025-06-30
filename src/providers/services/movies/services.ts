import { baseApi } from '@/support'
import { parseHttpErrors } from '@/providers/utils/parsers'
import type {
  iGetMoviesFilters,
  iGetMoviesResponse,
  iGetMoviesByQueryFilters
  // iFindMoviesSearched
} from './types'

class GetMoviesList {
  static async execute(filters: iGetMoviesFilters = {}): Promise<iGetMoviesResponse> {
    try {
      const params = {
        page: filters.page || 1,
        language: filters.language || 'pt-BR'
      }

      const queryParams = new URLSearchParams(params as Record<string, any>)
      const { data } = await baseApi.get(`/discover/movie?${queryParams.toString()}`)

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(parseHttpErrors(error))
    }
  }
}

class GetMoviesByQuery {
  static async execute(filters: iGetMoviesByQueryFilters): Promise<any> {
    try {
      const params = {
        page: filters.page || 1,
        language: filters.language || 'pt-BR',
        query: filters.query
      }

      const queryParams = new URLSearchParams(params as Record<string, any>)
      const { data } = await baseApi.get(`/search/movie?${queryParams.toString()}`)

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(parseHttpErrors(error))
    }
  }
}

export { GetMoviesList, GetMoviesByQuery }
