import React, { PropTypes } from 'react'
import Item from './item'

const Main = function(props) {
  return <div>
    <h1>Уроки</h1>
    <div className="list-group">
      {props.items.map(function(item, index) {
        return <Item key={index} {...item} />;
      })}
    </div>
  </div>
}

Main.propTypes = {
  items: PropTypes.array.isRequired
}

export default Main
