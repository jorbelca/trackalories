import { Schema, model } from 'mongoose';
import { Entry } from '../types/types';

const entrySchema = new Schema<Entry>({
  date: { type: Date, required: true },
  data: { type: [], required: true }
})

const Entry = model<Entry>('Entry', entrySchema)

export default Entry