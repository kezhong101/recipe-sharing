import { Router } from 'express'
import { requireAuth } from '../middleware/jwt.js'
import { toggleLike, isRecipeLiked } from '../services/likes.js'

const router = Router()

/**
 * Toggle like status for a recipe
 */
router.post('/api/v1/recipes/:id/like', requireAuth, async (req, res) => {
  try {
    const isLiked = await toggleLike(req.auth.sub, req.params.id)
    return res.json({ liked: isLiked })
  } catch (err) {
    console.error('Error toggling like:', err)
    return res.status(500).json({ error: 'Failed to toggle like status' })
  }
})

/**
 * Check if a recipe is liked by the current user
 */
router.get('/api/v1/recipes/:id/liked', requireAuth, async (req, res) => {
  try {
    const liked = await isRecipeLiked(req.auth.sub, req.params.id)
    return res.json({ liked })
  } catch (err) {
    console.error('Error checking like status:', err)
    return res.status(500).json({ error: 'Failed to check like status' })
  }
})

export default router
