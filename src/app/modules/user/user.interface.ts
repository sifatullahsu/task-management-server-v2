import { Model } from 'mongoose'
import { iRole } from '../../../global/types'

export type iUser = {
  name: string
  email: string
  password: string
  role: iRole
}

export type iUserModel = {
  hashGenerator(password: string): Promise<string>
  checkPassword(givenPassword: string, savedPassword: string): Promise<boolean>
} & Model<iUser>
