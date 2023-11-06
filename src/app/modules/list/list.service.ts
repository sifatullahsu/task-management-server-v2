import mongoose from 'mongoose'
import { IQueryMaker } from 'mongoose-query-maker'
import { iMeta, iReturnWithMeta } from '../../../global/types'
import { iJwtUser } from '../../../interface'
import Task from '../task/task.model'
import { iList } from './list.interface'
import List from './list.model'

const createData = async (data: Partial<iList>, user: iJwtUser): Promise<iList> => {
  const position = await List.findOne({ owner: user?._id }, 'position -_id', {
    sort: '-position'
  })

  const result = await List.create({
    ...data,
    position: position ? position.position + 1 : 1,
    owner: user?._id
  })

  return result
}

const getAllData = async (data: IQueryMaker): Promise<iReturnWithMeta<iList[]>> => {
  const { query, pagination, selector } = data
  const { page, limit, skip, sort } = pagination
  const { select, populate } = selector

  const result = await List.find(query).select(select).skip(skip).limit(limit).sort(sort).populate(populate)

  const count = await List.count(query)

  const meta: iMeta = {
    page,
    limit,
    count
  }

  return { meta, result }
}

const getData = async (id: string): Promise<iList | null> => {
  const result = await List.findById(id)

  return result
}

const updateData = async (id: string, data: Partial<iList>): Promise<iList | null> => {
  const result = await List.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true
  })

  return result
}

const deleteData = async (id: string): Promise<iList | null> => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // step 01: Delete associated tasks
    await Task.deleteMany({ list: id }, { session })

    // step 02: Delete list by _id
    const result = await List.findByIdAndDelete(id, { session })

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

const getAllDataWithTask = async (user: iJwtUser): Promise<iList[]> => {
  const userId = new mongoose.Types.ObjectId(user?._id)

  const result = await List.aggregate([
    {
      $match: {
        owner: { $eq: userId }
      }
    },
    {
      $project: {
        createdAt: 0,
        updatedAt: 0
      }
    },
    {
      $sort: {
        position: 1
      }
    },
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'list',
        as: 'tasks',
        pipeline: [
          {
            $project: {
              title: 1,
              position: 1
            }
          },
          {
            $sort: {
              position: 1
            }
          }
        ]
      }
    }
  ])

  return result
}

export const ListService = {
  createData,
  getAllData,
  getData,
  updateData,
  deleteData,
  getAllDataWithTask
}
