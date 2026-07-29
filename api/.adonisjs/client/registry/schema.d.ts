/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/auth/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').registerValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').registerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.destroy': {
    methods: ["GET","HEAD"]
    pattern: '/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
    }
  }
  'businesses.show': {
    methods: ["GET","HEAD"]
    pattern: '/business'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['show']>>>
    }
  }
  'businesses.find': {
    methods: ["GET","HEAD"]
    pattern: '/business/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['find']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['find']>>>
    }
  }
  'businesses.delete': {
    methods: ["GET","HEAD"]
    pattern: '/business/:id/delete'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['delete']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['delete']>>>
    }
  }
  'businesses.reevaluate': {
    methods: ["GET","HEAD"]
    pattern: '/business/:id/evaluate'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['reevaluate']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['reevaluate']>>>
    }
  }
  'businesses.create': {
    methods: ["POST"]
    pattern: '/business/create'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/business').createBusinessValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/business').createBusinessValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['create']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'businesses.update': {
    methods: ["PATCH"]
    pattern: '/business/:id/update'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/business').updateBusinessValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/business').updateBusinessValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/businesses_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'data.industries': {
    methods: ["GET","HEAD"]
    pattern: '/assets/industries'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/data_controller').default['industries']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/data_controller').default['industries']>>>
    }
  }
}
