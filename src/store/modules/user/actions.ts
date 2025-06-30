import { GetAccount } from '@/providers/services'

export const actions = {
  async getAccount({ commit }: any) {
    const account = await GetAccount.execute()

    commit('setAccount', account)
  }
}
