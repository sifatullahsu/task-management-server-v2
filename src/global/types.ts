import { Date, Types } from 'mongoose'

export type iId = Types.ObjectId
export type iMongooseDate = Date

export type iRole = 'admin' | 'user'

export type iMeta = {
  page: number
  limit: number
  count: number
}

export type iReturnWithMeta<T> = {
  meta: iMeta
  result: T
}
