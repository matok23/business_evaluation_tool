import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'businesses.show': { paramsTuple?: []; params?: {} }
    'businesses.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'businesses.create': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'businesses.show': { paramsTuple?: []; params?: {} }
    'businesses.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'auth.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'businesses.show': { paramsTuple?: []; params?: {} }
    'businesses.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'businesses.create': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}