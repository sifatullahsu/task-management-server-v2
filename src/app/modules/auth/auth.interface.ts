import { Types } from 'mongoose'
import { iRole } from '../../../global/types'

export type iAuth = {
  _id: Types.ObjectId
  name: string
  email: string
  role: iRole
  access_token: string
  refresh_token: string
}

export type iLoginReqData = {
  email: string
  password: string
}

export type iRefreshTokenReturn = {
  access_token: string
}
