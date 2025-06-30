export interface iGetMoviesFilters {
  language?: string
  page?: number
  query: string
}

export interface iMovie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  genres: string[]
  price: number
}

export interface iGetMoviesResponse {
  page: number
  results: iMovie[]
  total_pages: number
  total_results: number
}

export interface iGetMoviesByQueryFilters {
  language?: string
  page?: number
  query: string
}
// iFindMoviesSearched
