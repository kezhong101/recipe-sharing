import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Recipe({ title, ingredients, image_url, author: userId }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{ingredients}</div>
      <div>{image_url}</div>
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
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  image_url: PropTypes.string,
  author: PropTypes.string,
}
