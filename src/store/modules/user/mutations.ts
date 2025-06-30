import type { iUserAccount } from '@/providers/services'

export const mutations = {
  setAccount: (state: any, account: iUserAccount) => {
    Object.keys(state).forEach((key) => {
      if (account[key as keyof iUserAccount]) {
        state[key] = account[key as keyof iUserAccount]
      }
    })
  }
}
