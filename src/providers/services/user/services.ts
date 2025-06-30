import { baseApi } from '@/support'
import { parseHttpErrors } from '@/providers/utils/parsers'
import type { iUserAccount } from './types'

class GetAccount {
  static async execute(): Promise<iUserAccount> {
    try {
      const { data } = await baseApi.get('/account')

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(parseHttpErrors(error))
    }
  }
}

export { GetAccount }
