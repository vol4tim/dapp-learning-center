import React from 'react'
import Style from './style.css'

const Result = function(props) {
  return <div className={Style.callout +' '+ Style['callout-info']}>
    <h4>Результат</h4>
    {props.children}
  </div>
}

export default Result
