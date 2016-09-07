import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Item = function(props) {
  const { number, name, isExecute } = props

  return <Link to={'/learning/'+ number} className="list-group-item">
    Урок {number}: {name}
    {isExecute &&
      <span className="glyphicon glyphicon-ok pull-right"></span>
    }
  </Link>
}

Item.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isExecute: PropTypes.bool.isRequired
}

export default Item
