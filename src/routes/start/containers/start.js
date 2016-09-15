import { connect } from 'react-redux'
import { Main } from '../components/start';

function mapStateToProps(state) {
  const items = state.learning.items
  return {
    items
  }
}

export default connect(mapStateToProps)(Main)
