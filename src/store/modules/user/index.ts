import { actions } from './actions'
import { mutations } from './mutations'
import { state } from './state'
import { getters } from './getters'

export const user = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
