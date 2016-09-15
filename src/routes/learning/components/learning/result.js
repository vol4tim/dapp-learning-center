import React from 'react'
import Style from './style.css'

const Result = (props) => {
  const { children } = props

  return (<div className={Style.callout + ' ' + Style['callout-info']}>
    <h4>Результат</h4>
    {children}
  </div>)
}

export default Result
