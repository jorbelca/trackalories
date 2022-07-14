import mongoose from 'mongoose';


const operationSchema = new mongoose.Schema({
  url: { type: String, required: true },
  selector: { type: String, required: true },
  data: { type: [], required: true },
  time: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
})

operationSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
const Operation = mongoose.model('Operation', operationSchema)

export default Operation