import dotenv from 'dotenv'
dotenv.config()
import { initDatabase } from './db/init.js'

import { Recipe } from './db/models/recipe.js'

await initDatabase()

const recipe = new Recipe({
  title: 'Spaghetti Bolognese',
  ingredients: [
    { name: 'Spaghetti', amount: '200g' },
    { name: 'Ground Beef', amount: '300g' },
    { name: 'Tomato Sauce', amount: '1 cup' },
  ],
  author: 'John Doe',
  image_url: 'https://example.com/spaghetti.jpg',
})

await recipe.save()

const recipes = await Recipe.find()
console.log(recipes)
