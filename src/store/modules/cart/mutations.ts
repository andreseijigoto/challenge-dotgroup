import type { iMovie } from '@/providers/services'

export const mutations = {
  addToCart(state: any, movie: iMovie) {
    state.list.push(movie)
  },
  removeFromCart(state: any, index: number) {
    state.list.splice(index, 1)
  },
  clearCart(state: any) {
    state.list = []
  }
}
