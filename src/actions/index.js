import * as types from '../constants/ActionTypes'

export const loadData = data => (dispatch) => {
  dispatch({type: types.LOAD_DATA, payload: data})
}
