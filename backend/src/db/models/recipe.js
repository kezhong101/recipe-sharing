import mongoose, { Schema } from 'mongoose'
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    ingredients: [
      {
        name: { type: String, required: true },
        amount: { type: String },
      },
    ],
    author: String,
    image_url: String,
  },
  { timestamps: true },
)
export const Recipe = mongoose.model('recipe', postSchema)
