import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { LikeButton } from './LikeButton.jsx'

export function Recipe({
  _id,
  title,
  ingredients,
  image_url,
  author: userId,
  likeCount = 0,
}) {
  return (
    <article>
      <h2>{title}</h2>
      <div>
        <strong>Ingredients:</strong> {ingredients}
      </div>
      {image_url && (
        <div>
          <img
            src={image_url}
            alt={title}
            style={{ maxWidth: '300px', height: 'auto' }}
          />
        </div>
      )}
      <div className='recipe-actions'>
        <LikeButton recipeId={_id} initialLikeCount={likeCount} />
      </div>
      {userId && (
        <em>
          <br />
          Written by <User id={userId} />
        </em>
      )}
    </article>
  )
}

Recipe.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  image_url: PropTypes.string,
  author: PropTypes.string,
  likeCount: PropTypes.number,
}
