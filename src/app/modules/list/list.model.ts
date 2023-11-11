import { Schema, model } from 'mongoose'
import { iList, iListModel } from './list.interface'

const listSchema = new Schema<iList, iListModel>(
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

listSchema.statics.validatePosition = async (session, owner, position) => {
  const maxPositionDoc = await List.findOne(
    { owner },
    { position: 1, _id: 0 },
    { sort: { position: -1 }, session }
  )
  const maxPosition = maxPositionDoc ? maxPositionDoc.position : 0

  if (position > maxPosition) {
    throw new Error('Cannot move the document beyond the maximum position.')
  }
}

const List = model<iList, iListModel>('List', listSchema)

export default List
