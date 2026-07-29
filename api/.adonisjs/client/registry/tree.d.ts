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
    reevaluate: typeof routes['businesses.reevaluate']
    create: typeof routes['businesses.create']
    update: typeof routes['businesses.update']
  }
  data: {
    industries: typeof routes['data.industries']
  }
}
