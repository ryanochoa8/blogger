import mongoose from 'mongoose'

let ObjectId = mongoose.Schema.Types.ObjectId
let _schema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 60 },
  slug: { type: String, required: true, unique: true, lowercase: true },
  summary: { type: String, required: true, maxlength: 120 },
  author: { type: String, required: true },
  body: { type: String, required: true },
  tags: [{ type: String, required: true }]
}, { timestamps: true })

export default mongoose.model('Blog', _schema)