import { Fragment, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Recipe } from './Recipe.jsx'
import { SortingDropdown } from './SortingDropdown.jsx'

export function RecipeList() {
  const [sortOrder, setSortOrder] = useState('descending')

  const {
    data: recipes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['recipes', { sortBy: 'likeCount', sortOrder }],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/recipes?` +
          new URLSearchParams({
            sortBy: 'likeCount',
            sortOrder,
          }),
      )
      if (!res.ok) throw new Error('Failed to fetch recipes')
      return res.json()
    },
  })

  if (isLoading) return <div>Loading recipes...</div>
  if (error) return <div>Error loading recipes: {error.message}</div>

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>All Recipes</h1>
        <SortingDropdown sortOrder={sortOrder} onSortChange={setSortOrder} />
      </div>

      {recipes.map((recipe) => (
        <Fragment key={recipe._id}>
          <Recipe {...recipe} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}
