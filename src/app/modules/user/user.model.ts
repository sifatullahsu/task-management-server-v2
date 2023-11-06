import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { xRole } from '../../../global/constant'
import { iUser, iUserModel } from './user.interface'

const userSchema = new Schema<iUser, iUserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, required: true, enum: xRole, default: 'user' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.statics.hashGenerator = async password => {
  return await bcrypt.hash(password, Number(config.soltRounds))
}

userSchema.statics.checkPassword = async (givenPassword, savedPassword) => {
  return await bcrypt.compare(givenPassword, savedPassword)
}

userSchema.pre('save', async function (next) {
  this.password = await User.hashGenerator(this.password)

  next()
})

userSchema.pre('findOneAndUpdate', async function () {
  const user = <Partial<iUser>>this.getUpdate()

  if (user?.password) {
    user.password = await User.hashGenerator(user.password)
  }
})

const User = model<iUser, iUserModel>('User', userSchema)

export default User
