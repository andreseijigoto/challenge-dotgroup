import {
  GetMoviesList,
  GetMovieGenresList,
  GetMoviesByQuery,
  type iGetMoviesFilters,
  type iGetMoviesResponse
} from '@/providers/services'

export const actions = {
  async getGenres({ commit }: any) {
    const { genres } = await GetMovieGenresList.execute()

    commit('setGenres', genres)
  },
  async getMovieList({ commit }: any, filter: iGetMoviesFilters) {
    commit('setQuery', filter?.query || '')

    const response: iGetMoviesResponse = filter?.query
      ? await GetMoviesByQuery.execute(filter)
      : await GetMoviesList.execute(filter)

    commit('setMovies', response)
  }
}
