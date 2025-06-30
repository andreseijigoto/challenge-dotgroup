export const mutations = {
  setLoading(state: any, status: boolean = false) {
    state.isLoadingOpened = status
  },
  setFavorites(state: any, status: boolean = false) {
    state.isFavoritesOpened = status
  },
  setCheckout(state: any, status: boolean = false) {
    state.isCheckoutOpened = status
  }
}
