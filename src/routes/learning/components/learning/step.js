import React, { PropTypes } from 'react'

const Step = (props) => {
  const { name, status } = props
  let css = 'list-group-item'
  if (status === 1) {
    css += ' list-group-item-info'
  } else if (status === 2) {
    css += ' list-group-item-success'
  }
  return (<span className={css}>
    {name}
    {status === 2 &&
      <span className="glyphicon glyphicon-ok pull-right" />
    }
  </span>)
}

Step.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
}

export default Step
