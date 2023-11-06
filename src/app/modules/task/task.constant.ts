import { IQueryMakerFields, IQuerySelectorFields } from 'mongoose-query-maker'
import { iRole } from '../../../global/types'
import { iTask } from './task.interface'

export const taskQuery: IQueryMakerFields<iTask, iRole> = {
  all: 'OPEN',
  filter: []
}

export const taskSelector: IQuerySelectorFields = {
  select: [],
  populate: []
}
