import { Schema, model } from 'mongoose'
import { iTask, iTaskModel } from './task.interface'

const tasskSchema = new Schema<iTask, iTaskModel>(
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

const Task = model<iTask, iTaskModel>('Task', tasskSchema)

export default Task
