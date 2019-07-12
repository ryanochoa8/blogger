import mongoose from 'mongoose'

let ObjectId = mongoose.Schema.Types.ObjectId
let _schema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 60 },
  slug: { type: String, unique: true, lowercase: true },
  summary: { type: String, maxlength: 120 },
  author: { type: String, required: true },
  body: { type: String },
  tags: [{ type: String }]
}, { timestamps: true })

export default mongoose.model('Blog', _schema)