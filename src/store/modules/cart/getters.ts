export const getters = {
  getCartResume: (state: any) => {
    if (!!state.list.length) {
      return state.list.reduce((acc: number, movie: any) => acc + movie.price, 0)
    }

    return null
  }
}
