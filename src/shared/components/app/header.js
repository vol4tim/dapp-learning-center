import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Header = function Header(props) {
  return (
    <nav className="navbar navbar-inverse navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link to="/" className="navbar-brand">{props.title}</Link>
        </div>
        <div className="collapse navbar-collapse">
          <p className="navbar-text navbar-right">
            {props.dao_address !== '' &&
              <span>
                Ваше DAO: {props.dao_address}
                <Link to="/dao"><span className="glyphicon glyphicon-chevron-right" /></Link> |
              </span>
            }
            Ваш баланс: {props.balance} AIR
          </p>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  dao_address: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired
}

export default Header
