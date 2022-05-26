import { Schema, model } from 'mongoose';
import { User } from '../types/types';

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  activity: { type: Number, required: true },
  gender: { type: String, required: true }
})

const User = model<User>('User', userSchema)

export default User