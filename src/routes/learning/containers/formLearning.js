import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import _ from 'lodash'
import { submitFormLearning } from '../../../modules/learning/actions';
import Form from '../components/learning/form';

function mapStateToProps(state, props) {
  const learning = _.find(state.learning.items, { number: _.toNumber(props.number) })
  const fields = _.keys(learning.form)
  const labels = _.values(_.mapValues(learning.form, 'label'))
  const placeholders = _.values(_.mapValues(learning.form, 'placeholder'))
  return {
    fields,
    labels,
    placeholders
  }
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submitFormLearning(form, props.number), dispatch)
  }
}
export default reduxForm({}, mapStateToProps, mapDispatchToProps)(Form)
