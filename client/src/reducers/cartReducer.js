/**
 * Created by AndreaMerten on 11/15/17.
 */

import {ADD_TO_CART, GET_CART, EDIT_CART, REMOVE_ITEM,
UPDATE_CART_QUANTITY} from '../actions/types'



//imported by reducers/index
//action is sent to this reducer which will return new state causing rerender
//
export default function (state = [], action) {
  //console.log('action from ADD TO CART REDUCER', action)
  switch (action.type) {
    case ADD_TO_CART:
      return action.payload
    case GET_CART:
      return action.payload
    case EDIT_CART:
      return action.payload
    case REMOVE_ITEM:
      return action.payload
    default:
      return state
  }
}
