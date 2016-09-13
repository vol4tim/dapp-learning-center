import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getWeb3, isAccounts } from '../../utils/web3'

import Header from '../components/app/header'
import Footer from '../components/app/footer'
import Notification from '../components/app/notification'
import { flashMessage } from '../../modules/app/actions';
import { getDaoAddress, updateAirBalance, loadIsExecute } from '../../modules/learning/actions';
import { loadDao } from '../../modules/dao/actions';

import './style.css'

class App extends Component {
  componentWillMount() {
    this.props.getDaoAddress()
    this.props.loadDao()
    this.props.updateAirBalance()
    this.props.loadIsExecute()
  }
  render() {
    var content
    if (getWeb3()) {
      if (isAccounts()) {
        content = this.props.children
      } else {
        content = <p>нет аккаунтов</p>
      }
    } else {
      content = <p>нужен mist</p>
    }

    return (<div>
      <Header
        title={this.props.title}
        dao_address={this.props.dao_address}
        balance={this.props.balance}
      />
      <div className="container">
        {content}
      </div>
      <Footer />
      <Notification message={this.props.flash_message} onClose={() => this.props.flashMessage('')} />
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    title: state.app.title,
    flash_message: state.app.flash_message,
    dao_address: state.app.dao_address,
    balance: state.app.balance
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    flashMessage, getDaoAddress, updateAirBalance, loadIsExecute, loadDao
  }, dispatch)
  return {
    flashMessage: actions.flashMessage,
    getDaoAddress: actions.getDaoAddress,
    updateAirBalance: actions.updateAirBalance,
    loadIsExecute: actions.loadIsExecute,
    loadDao: actions.loadDao
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
