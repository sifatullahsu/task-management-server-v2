import { Model } from 'mongoose'
import { iId } from '../../../global/types'

export type iList = {
  title: string
  position: number
  owner: iId
}

export type iListModel = Model<iList>
