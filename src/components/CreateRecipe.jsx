import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createRecipe } from '../api/recipes.js'

export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [token] = useAuth()
  const [ingredients, setIngredients] = useState('')
  const [image_url, setImageUrl] = useState('')

  const queryClient = useQueryClient()

  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, ingredients, image_url}),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipeMutation.mutate()
  }

  if (!token) return <div>Please log in to create new recipes.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-ingredients'>Ingredients: </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <br />
      </div>
      <div>
        <label htmlFor='create-title'>Image URL: </label>
        <input
          type='text'
          name='create-url'
          id='create-url'
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <br />
      <br />
      <input
        type='submit'
        value={createRecipeMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createRecipeMutation.isPending}
      />
      {createRecipeMutation.isSuccess ? (
        <>
          <br />
          Recipe created successfully!
        </>
      ) : null}
    </form>
  )
}
