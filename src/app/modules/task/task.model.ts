import { Schema, model } from 'mongoose'
import { iTask, iTaskModel } from './task.interface'

const taskSchema = new Schema<iTask, iTaskModel>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Low' },
    position: { type: Number, required: true },
    list: { type: Schema.Types.ObjectId, ref: 'List', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

taskSchema.statics.validatePosition = async (session, owner, list, position, additionalPosition) => {
  const maxPositionDoc = await Task.findOne(
    { owner, list },
    { position: 1, _id: 0 },
    { sort: { position: -1 }, session }
  )
  const maxPosition = maxPositionDoc ? maxPositionDoc.position : 0

  if (position > maxPosition + additionalPosition) {
    throw new Error('Cannot move the document beyond the maximum position.')
  }
}

const Task = model<iTask, iTaskModel>('Task', taskSchema)

export default Task
