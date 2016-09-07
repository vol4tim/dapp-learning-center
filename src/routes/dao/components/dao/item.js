import React, { PropTypes } from 'react'

const Item = function(props) {
  const { name, address } = props

  return <div className="list-group-item">
    {name}<br /><small>{address}</small>
  </div>
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
}

export default Item
