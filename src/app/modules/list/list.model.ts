import { Schema, model } from 'mongoose'
import { iList, iListModel } from './list.interface'

const tasskSchema = new Schema<iList, iListModel>(
  {
    title: { type: String, required: true, trim: true },
    position: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const List = model<iList, iListModel>('List', tasskSchema)

export default List
