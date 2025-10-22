import mongoose, { Schema } from 'mongoose'

const likeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    recipe: { type: Schema.Types.ObjectId, ref: 'recipe', required: true },
  },
  { timestamps: true }
)

// Ensure a user can only like a recipe once
likeSchema.index({ user: 1, recipe: 1 }, { unique: true })

export const Like = mongoose.model('like', likeSchema)