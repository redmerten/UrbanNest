/**
 * Created by AndreaMerten on 11/17/17.
 */
import {UPDATE_CART_QUANTITY} from '../actions/types'



//imported by reducers/index
//action is sent to this reducer which will return new state causing rerender
//
export default function (state = 0, action) {
  //console.log('action from ADD TO CART REDUCER', action)
  switch (action.type) {
    case UPDATE_CART_QUANTITY:
      console.log('quantity reducer', state, action.payload)
      const quantity = state + action.payload
      return quantity
    default:
      return state
  }
}
