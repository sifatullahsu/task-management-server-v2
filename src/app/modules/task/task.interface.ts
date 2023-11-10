import mongoose, { ClientSession, Model } from 'mongoose'
import { iId } from '../../../global/types'

export type iTask = {
  title: string
  description: string
  priority: 'High' | 'Medium' | 'Low'
  position: number
  list: iId
  owner: iId
}

export type iTaskModel = {
  validatePosition(
    session: ClientSession,
    owner: string | mongoose.Types.ObjectId,
    list: string | mongoose.Types.ObjectId,
    position: number,
    additionalPosition: number
  ): Promise<void>
} & Model<iTask>
