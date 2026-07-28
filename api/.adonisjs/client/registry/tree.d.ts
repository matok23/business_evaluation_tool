/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
      destroy: typeof routes['auth.access_tokens.destroy']
    }
  }
  businesses: {
    show: typeof routes['businesses.show']
    delete: typeof routes['businesses.delete']
    create: typeof routes['businesses.create']
  }
}
