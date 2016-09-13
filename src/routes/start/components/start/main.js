import React, { PropTypes } from 'react'
import Item from './item'

const Main = (props) => {
  const { items } = props

  return (<div>
    <h1>Уроки</h1>
    <div className="list-group">
      {items.map((item, index) => <Item key={index} {...item} />)}
    </div>
  </div>)
}

Main.propTypes = {
  items: PropTypes.array.isRequired
}

export default Main
