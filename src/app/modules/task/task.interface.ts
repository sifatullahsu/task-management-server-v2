import { Model } from 'mongoose'
import { iId } from '../../../global/types'

export type iTask = {
  title: string
  description: string
  priority: 'High' | 'Medium' | 'Low'
  position: number
  list: iId
  owner: iId
}

export type iTaskModel = Model<iTask>
