export const actions = {
  setLoading({ commit }: any, status: boolean = false) {
    commit('setLoading', status)
  },
  setFavorites({ commit }: any, status: boolean = false) {
    commit('setFavorites', status)
  },
  setCheckout({ commit }: any, status: boolean = false) {
    commit('setCheckout', status)
  }
}
