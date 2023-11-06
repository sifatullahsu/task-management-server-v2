import { IQueryMakerFields, IQuerySelectorFields } from 'mongoose-query-maker'
import { iRole } from '../../../global/types'
import { iList } from './list.interface'

export const ListQuery: IQueryMakerFields<iList, iRole> = {
  all: 'OPEN',
  filter: []
}

export const listSelector: IQuerySelectorFields = {
  select: [],
  populate: []
}
