import mongoose, { ClientSession, Model } from 'mongoose'
import { iId } from '../../../global/types'

export type iList = {
  title: string
  position: number
  owner: iId
}

export type iListModel = {
  validatePosition(
    session: ClientSession,
    owner: string | mongoose.Types.ObjectId,
    position: number
  ): Promise<void>
} & Model<iList>
