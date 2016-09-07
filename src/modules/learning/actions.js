import {startSubmit, stopSubmit, reset} from 'redux-form';
import _ from 'lodash'
import { getCoreAddress, getAirBalance, lessons, lessonsCheck, isPassed } from '../../utils/learning'
import { LOAD_IS_EXECUTE, SET_RESULT_FORM, SET_RESULT_FORM_CHECK, SET_PROGRESS_FORM } from './actionTypes'
import { setDaoAddress, setBalance } from '../app/actions'

export function setProgress(number, step, status) {
	return dispatch => {
		dispatch({
			type: SET_PROGRESS_FORM,
			payload: {
				number,
				step,
				status
			}
		})
	}
}

export function submitFormLearning(form, number) {
	return dispatch => {
		const formName = 'FormLearning'+ number
		dispatch(startSubmit(formName));
		dispatch(setProgress(number, 0, 1))
		lessons[number]((step, status) => dispatch(setProgress(number, step, status)), _.values(form)).
			then((result)=>{
				dispatch(stopSubmit(formName));
				dispatch({
					type: SET_RESULT_FORM,
					payload: {
						number,
						result
					}
				})
				dispatch(reset(formName));
				if (number == 1) {
					dispatch(setDaoAddress(result.address))
				}
			}).
			catch(function(e) {
				console.log('SUBMIT ERR', e);
				dispatch(stopSubmit(formName, {error: e}));
			});
	}
}

export function submitFormLearning12121212(form, number) {
  return dispatch => {
    const formName = 'FormLearning'+ number
    dispatch(startSubmit(formName));
    lessons[number](_.values(form)).
      then((result)=>{
        dispatch(stopSubmit(formName));
        dispatch({
          type: SET_RESULT_FORM,
          payload: {
            number,
            result
          }
        })
        dispatch(reset(formName));
        if (number == 1) {
          dispatch(setDaoAddress(result.address))
        }
      }).
      catch(function(e) {
        console.log('SUBMIT ERR', e);
        dispatch(stopSubmit(formName, {error: e}));
      });
  }
}

export function submitFormCheck(form, number) {
  return dispatch => {
    const formName = 'FormCheck'+ number
    dispatch(startSubmit(formName));
    lessonsCheck[number](_.values(form)).
      then((result)=>{
        dispatch(stopSubmit(formName));
        dispatch({
          type: SET_RESULT_FORM_CHECK,
          payload: {
            number,
            result
          }
        })
        dispatch(reset(formName));
        if (result) {
          dispatch(updateAirBalance())
        }
      }).
      catch(function(e) {
        console.log('SUBMIT ERR', e);
        dispatch(stopSubmit(formName, {error: e}));
      });
  }
}

export function getDaoAddress() {
  return dispatch => {
    getCoreAddress().
      then((address)=>{
        dispatch(setDaoAddress(address));
      }).
      catch(function(e) {
        console.log('ERR', e);
      });
  }
}

export function updateAirBalance() {
  return dispatch => {
    getAirBalance().
      then((balance)=>{
        dispatch(setBalance(balance));
      }).
      catch(function(e) {
        console.log('ERR', e);
      });
  }
}

export function loadIsExecute() {
  return (dispatch, getState) => {
    var state = getState()
    _.forEach(state.learning.items, function(item){
      isPassed(item.number).
        then((isExecute)=>{
          dispatch({
            type: LOAD_IS_EXECUTE,
            payload: {
              number: item.number,
              isExecute
            }
          });
        }).
        catch(function(e) {
          console.log('ERR', e);
        });
    })
  }
}
