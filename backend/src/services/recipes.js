import { Recipe } from '../db/models/recipe.js'
import { User } from '../db/models/user.js'

export async function createRecipe(userId, { title, ingredients, image_url }) {
  const recipe = new Recipe({ title, author: userId, ingredients, image_url })
  return await recipe.save()
}

async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  const sortDirection = sortOrder === 'descending' ? -1 : 1
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
      $sort: { [sortBy]: sortDirection },
    },
    {
      $project: {
        likes: 0, // Remove the likes array from the response
      },
    },
  ])
}

export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}

export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listRecipes({ author: user._id }, options)
}

export async function getRecipeById(recipeId) {
  const [recipe] = await Recipe.aggregate([
    { $match: { _id: recipeId } },
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
      $project: {
        likes: 0, // Remove the likes array from the response
      },
    },
  ])
  return recipe
}

export async function updateRecipe(userId, recipeId, updates) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, author: userId },
    { $set: updates },
    { new: true },
  )
}

export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId })
}
