/**
 * Created by CameronMerten on 10/19/17.
 */
import {FETCH_DETAIL} from '../actions/types'

//this will decide whether the user is logged in

//imported by reducers/index
//action is sent to this reducer which will return new state causing rerender
//
export default function (state = {}, action) {
  //console.log('action from PRODUCT REDUCER', action)
  switch (action.type) {
    case FETCH_DETAIL:
      return action.payload
    default:
      return state
  }
}
