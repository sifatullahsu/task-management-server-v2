import { IQueryMaker } from 'mongoose-query-maker'
import { iMeta, iReturnWithMeta } from '../../../global/types'
import { iUser } from './user.interface'
import User from './user.model'

const getAllData = async (data: IQueryMaker): Promise<iReturnWithMeta<iUser[]>> => {
  const { query, pagination, selector } = data
  const { page, limit, skip, sort } = pagination
  const { select, populate } = selector

  const result = await User.find(query).select(select).skip(skip).limit(limit).sort(sort).populate(populate)

  const count = await User.count(query)

  const meta: iMeta = {
    page,
    limit,
    count
  }

  return { meta, result }
}

const getData = async (id: string): Promise<iUser | null> => {
  const result = await User.findById(id)

  return result
}

const updateData = async (id: string, data: Partial<iUser>): Promise<iUser | null> => {
  const result = await User.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true
  })

  return result
}

export const UserService = {
  getAllData,
  getData,
  updateData
}
