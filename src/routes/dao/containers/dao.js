import { connect } from 'react-redux'
import { Main } from '../components/dao';

function mapStateToProps(state) {
  const items = state.dao.items
  return {
    items
  }
}

export default connect(mapStateToProps)(Main)
