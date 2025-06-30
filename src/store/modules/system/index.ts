import { actions } from './actions'
import { mutations } from './mutations'
import { state } from './state'
import { getters } from './getters'

export const system = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
