import PropTypes from 'prop-types'

export function SortingDropdown({ sortOrder, onSortChange }) {
  return (
    <select
      value={sortOrder}
      onChange={(e) => onSortChange(e.target.value)}
      className='p-2 border rounded-md mb-4'
      aria-label='Sort recipes by likes'
    >
      <option value='descending'>Most Liked First</option>
      <option value='ascending'>Least Liked First</option>
    </select>
  )
}

SortingDropdown.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
}
