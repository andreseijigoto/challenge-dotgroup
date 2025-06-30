import type { iMovie, iMovieGenre } from '@/providers/services'

export const getters = {
  getMovieList: ({ movieList, genres }: any) => {
    return movieList.map((movie: iMovie) => ({
      ...movie,
      price: parseFloat((Math.random() * 90 + 9.99).toFixed(2)), // random price between 9.99 and 99.99
      genres: movie?.genre_ids?.length
        ? movie?.genre_ids.map(
            (genreId: number) => genres.find((genre: iMovieGenre) => genre.id === genreId)?.name
          )
        : ['Sem gênero']
    }))
  }
}
