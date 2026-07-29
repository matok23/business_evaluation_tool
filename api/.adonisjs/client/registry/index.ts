/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/auth/register',
    tokens: [{"old":"/auth/register","type":0,"val":"auth","end":""},{"old":"/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'auth.access_tokens.destroy': {
    methods: ["GET","HEAD"],
    pattern: '/auth/logout',
    tokens: [{"old":"/auth/logout","type":0,"val":"auth","end":""},{"old":"/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_tokens.destroy']['types'],
  },
  'businesses.show': {
    methods: ["GET","HEAD"],
    pattern: '/business',
    tokens: [{"old":"/business","type":0,"val":"business","end":""}],
    types: placeholder as Registry['businesses.show']['types'],
  },
  'businesses.delete': {
    methods: ["GET","HEAD"],
    pattern: '/business/:id/delete',
    tokens: [{"old":"/business/:id/delete","type":0,"val":"business","end":""},{"old":"/business/:id/delete","type":1,"val":"id","end":""},{"old":"/business/:id/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['businesses.delete']['types'],
  },
  'businesses.reevaluate': {
    methods: ["GET","HEAD"],
    pattern: '/business/:id/evaluate',
    tokens: [{"old":"/business/:id/evaluate","type":0,"val":"business","end":""},{"old":"/business/:id/evaluate","type":1,"val":"id","end":""},{"old":"/business/:id/evaluate","type":0,"val":"evaluate","end":""}],
    types: placeholder as Registry['businesses.reevaluate']['types'],
  },
  'businesses.create': {
    methods: ["POST"],
    pattern: '/business/create',
    tokens: [{"old":"/business/create","type":0,"val":"business","end":""},{"old":"/business/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['businesses.create']['types'],
  },
  'businesses.update': {
    methods: ["PATCH"],
    pattern: '/business/:id/update',
    tokens: [{"old":"/business/:id/update","type":0,"val":"business","end":""},{"old":"/business/:id/update","type":1,"val":"id","end":""},{"old":"/business/:id/update","type":0,"val":"update","end":""}],
    types: placeholder as Registry['businesses.update']['types'],
  },
  'data.industries': {
    methods: ["GET","HEAD"],
    pattern: '/data/industries',
    tokens: [{"old":"/data/industries","type":0,"val":"data","end":""},{"old":"/data/industries","type":0,"val":"industries","end":""}],
    types: placeholder as Registry['data.industries']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
