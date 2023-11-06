import { IQueryMakerFields, IQuerySelectorFields } from 'mongoose-query-maker'
import { iRole } from '../../../global/types'
import { iUser } from './user.interface'

export const userQuery: IQueryMakerFields<iUser, iRole> = {
  all: 'OPEN',
  filter: [['role', ['$eq', '$ne'], 'OPEN']]
}

export const userSelector: IQuerySelectorFields = {
  select: [],
  populate: []
}
