import type { iGetMoviesResponse } from '@/providers/services'

export const mutations = {
  setQuery(state: any, query: string) {
    state.query = query
  },
  setGenres(state: any, genres: any) {
    state.genres = genres
  },
  setMovies(state: any, response: iGetMoviesResponse) {
    state.movieList = response.results
    state.moviePage = response.page
    state.totalResults = Math.min(response.total_results, 10000)
    state.totalPages = Math.min(response.total_pages, 500)
  }
}
