import httpStatus from 'http-status'
import mongoose from 'mongoose'
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
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (data.position && data.list) {
      // Get the previous data of the document being updated
      const previous = await Task.findById(id, {}, { session })
      if (!previous) throw new Error('Data not found.')

      const { _id, owner, position, list } = previous

      // Change position on the same list
      if (data.list.toString() === list.toString()) {
        if (data.position !== position) {
          // Validate position
          await Task.validatePosition(session, owner, list, data.position, 0)

          // Determine whether to increment or decrement positions
          const increment = data.position > position ? -1 : 1

          // Use updateMany to adjust positions for affected documents
          await Task.updateMany(
            {
              $and: [
                { owner: { $eq: owner } },
                { _id: { $ne: _id } },
                {
                  position:
                    increment === 1
                      ? { $gte: data.position, $lte: position }
                      : { $gt: position, $lte: data.position }
                }
              ]
            },
            { $inc: { position: increment } },
            { session }
          )
        }
      }

      // Change position on the diffrent list
      else {
        // Validate position
        await Task.validatePosition(session, owner, data.list, data.position, 1)

        // Update position: [prev list, new list]
        await Task.bulkWrite(
          [
            {
              updateMany: {
                filter: { owner, list, position: { $gt: position } },
                update: { $inc: { position: -1 } }
              }
            },
            {
              updateMany: {
                filter: { owner, list: data.list, position: { $gte: data.position } },
                update: { $inc: { position: 1 } }
              }
            }
          ],
          { session }
        )
      }
    }

    // Update the document with the provided data
    const result = await Task.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
      session
    })

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

const deleteData = async (id: string): Promise<iTask | null> => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // step 01: Delete Task by _id
    const result = await Task.findByIdAndDelete(id, { session })

    const { owner, list, position } = result!.toObject()

    // step 02: Update list position to -1
    await Task.updateMany(
      { $and: [{ owner: { $eq: owner } }, { list: { $eq: list } }, { position: { $gt: position } }] },
      { $inc: { position: -1 } },
      { session }
    )

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

export const TaskService = {
  createData,
  getAllData,
  getData,
  updateData,
  deleteData
}
