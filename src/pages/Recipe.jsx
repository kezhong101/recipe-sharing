import { RecipeList } from '../components/RecipeList.jsx'
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { Header } from '../components/Header.jsx'

import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'

export function Recipe() {
  const recipesQuery = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  })

  const recipes = recipesQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <br />
      <hr />
      <CreateRecipe />
      <br />
      <hr />
      <RecipeList recipes={recipes} />
    </div>
  )
}
