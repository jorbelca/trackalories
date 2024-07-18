import mongoose, { Document, Schema, model } from "mongoose";
import { Entry } from "../types/types";

const entrySchema = new Schema<Entry>({
  date: { type: String, required: true },
  data: { type: [], required: true },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

entrySchema.set("toJSON", {
  transform: (_document: Document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
// eslint-disable-next-line
const Entry = model<Entry>("Entry", entrySchema);

export default Entry;
