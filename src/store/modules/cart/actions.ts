import type { iMovie } from '@/providers/services'

export const actions = {
  addToCart({ commit }: any, movie: iMovie) {
    commit('addToCart', movie)
  },
  removeFromCart({ commit }: any, index: number) {
    commit('removeFromCart', index)
  },
  clearCart({ commit }: any) {
    commit('clearCart')
  }
}
