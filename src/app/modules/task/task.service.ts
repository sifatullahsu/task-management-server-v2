import httpStatus from 'http-status'
import { IQueryMaker } from 'mongoose-query-maker'
import ApiError from '../../../error/ApiError'
import { iMeta, iReturnWithMeta } from '../../../global/types'
import { iJwtUser } from '../../../interface'
import List from '../list/list.model'
import { iTask } from './task.interface'
import Task from './task.model'

const createData = async (data: Partial<iTask>, user: iJwtUser): Promise<iTask> => {
  const count = await List.count({ $and: [{ _id: data.list }, { owner: user?._id }] })
  if (!count) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')

  const position = await Task.findOne(
    { $and: [{ list: data.list }, { owner: user?._id }] },
    'position -_id',
    {
      sort: '-position'
    }
  )

  const result = await Task.create({
    ...data,
    owner: user?._id,
    position: position ? position.position + 1 : 1
  })

  return result
}

const getAllData = async (data: IQueryMaker): Promise<iReturnWithMeta<iTask[]>> => {
  const { query, pagination, selector } = data
  const { page, limit, skip, sort } = pagination
  const { select, populate } = selector

  const result = await Task.find(query).select(select).skip(skip).limit(limit).sort(sort).populate(populate)

  const count = await Task.count(query)

  const meta: iMeta = {
    page,
    limit,
    count
  }

  return { meta, result }
}

const getData = async (id: string): Promise<iTask | null> => {
  const result = await Task.findById(id)

  return result
}

const updateData = async (id: string, data: Partial<iTask>): Promise<iTask | null> => {
  const result = await Task.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true
  })

  return result
}

const deleteData = async (id: string): Promise<iTask | null> => {
  const result = await Task.findByIdAndDelete(id)

  return result
}

export const TaskService = {
  createData,
  getAllData,
  getData,
  updateData,
  deleteData
}
