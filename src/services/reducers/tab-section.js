import { handleActions } from 'redux-actions'
import { SET_CURRENT } from "../actions/tab-section";

const initialState = {
  current: 'bun'
}

const handleTabSwitch = (state, {payload}) => ({
  ...state,
  current: payload
})

const tabReducer = handleActions({
  [SET_CURRENT]: handleTabSwitch,
}, initialState)


export default tabReducer;
