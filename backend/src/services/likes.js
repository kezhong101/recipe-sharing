import { Like } from '../db/models/like.js'
import { Recipe } from '../db/models/recipe.js'

/**
 * Toggle like status for a recipe
 * @param {string} userId - The ID of the user
 * @param {string} recipeId - The ID of the recipe
 * @returns {Promise<boolean>} - Returns true if recipe is now liked, false if unliked
 */
export async function toggleLike(userId, recipeId) {
  const existingLike = await Like.findOne({ user: userId, recipe: recipeId })

  if (existingLike) {
    await Like.deleteOne({ _id: existingLike._id })
    return false // Returns false to indicate recipe is now unliked
  }

  await Like.create({ user: userId, recipe: recipeId })
  return true // Returns true to indicate recipe is now liked
}

/**
 * Get recipes with their like counts
 * @param {Object} query - MongoDB query object
 * @returns {Promise<Array>} - Array of recipes with like counts
 */
export async function getRecipesWithLikes(query = {}) {
  return await Recipe.aggregate([
    { $match: query },
    {
      $lookup: {
        from: 'likes',
        localField: '_id',
        foreignField: 'recipe',
        as: 'likes',
      },
    },
    {
      $addFields: {
        likeCount: { $size: '$likes' },
      },
    },
    {
      $sort: { likeCount: -1, createdAt: -1 },
    },
  ])
}

/**
 * Check if a user has liked a specific recipe
 * @param {string} userId - The ID of the user
 * @param {string} recipeId - The ID of the recipe
 * @returns {Promise<boolean>} - Returns true if recipe is liked by user
 */
export async function isRecipeLiked(userId, recipeId) {
  const like = await Like.findOne({ user: userId, recipe: recipeId })
  return !!like
}
