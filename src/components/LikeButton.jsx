import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useAuth } from '../contexts/AuthContext.jsx'

export function LikeButton({ recipeId, initialLikeCount }) {
  const [token] = useAuth()
  const queryClient = useQueryClient()
  const [localLikeCount, setLocalLikeCount] = useState(initialLikeCount)

  const { data: likeStatus } = useQuery({
    queryKey: ['recipes', recipeId, 'liked'],
    queryFn: async () => {
      if (!token) return { liked: false }
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/recipes/${recipeId}/liked`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (!res.ok) {
        throw new Error('Failed to fetch like status')
      }
      return res.json()
    },
    enabled: !!token,
  })

  const likeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/recipes/${recipeId}/like`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (!res.ok) {
        throw new Error('Failed to toggle like')
      }
      return res.json()
    },
    onSuccess: (data) => {
      setLocalLikeCount((prev) => (data.liked ? prev + 1 : prev - 1))
      queryClient.invalidateQueries(['recipes', recipeId, 'liked'])
    },
  })

  if (!token) {
    return <span className='like-count'>❤️ {localLikeCount}</span>
  }

  return (
    <button
      className={`like-button ${likeStatus?.liked ? 'liked' : ''}`}
      onClick={() => likeMutation.mutate()}
      disabled={likeMutation.isPending}
      aria-label={likeStatus?.liked ? 'Unlike recipe' : 'Like recipe'}
    >
      {likeStatus?.liked ? '❤️' : '🤍'} {localLikeCount}
    </button>
  )
}

LikeButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
  initialLikeCount: PropTypes.number.isRequired,
}
