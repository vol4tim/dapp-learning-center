import { connect } from 'react-redux'
import _ from 'lodash'
import { Main } from '../components/learning';

function mapStateToProps(state, props) {
  const learning = _.find(state.learning.items, {number: _.toNumber(props.params.number)})
  return {
    ...learning
  }
}

export default connect(mapStateToProps)(Main)
