import React, { PropTypes, Component } from 'react'

export default class Form extends Component {
  render() {
    const {
      fields,
      handleSubmit,
      error,
      submitting,
      labels,
      placeholders
    } = this.props

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        {Object.keys(fields).map((name, index) => {
          const field = fields[name]
          return (
            <div key={index} className="form-group">
              <label className="col-sm-4 control-label">{labels[index]}</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" placeholder={placeholders[index]} {...field} />
              </div>
              {field.touched && field.error ? field.error : ''}
            </div>
          )
        })}

        <div className="form-group">
          <div className="text-center">
            <input
              type='submit'
              className="btn btn-default"
              disabled={submitting}
              value={submitting ? '...' : 'Подтвердить'}
              />
          </div>
        </div>
        {error && <div>{error}</div>}
      </form>
    )
  }
}

Form.propTypes = {
  labels: PropTypes.array.isRequired,
  placeholders: PropTypes.array.isRequired
}
