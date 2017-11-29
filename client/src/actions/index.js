/**
 * Created by CameronMerten on 10/2/17.
 */

//communicates via ajax to server side using axios


import {FETCH_USER, FETCH_PRODUCTS, FETCH_IMAGE,
FETCH_DETAIL, ADD_TO_CART, GET_CART, UPDATE_CART_QUANTITY,
EDIT_CART, REMOVE_ITEM} from './types'

import axios from 'axios'

//wired up to middleware in src index.js
/*
export const fetchUser = () => {
  //pass in dispatch action function to run after axios is finished
  //res is response from get
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({
        type: FETCH_USER,
        payload: res
      }))
  }
}
*/
//same as above
//only need data property
//dispatch is the param

//reducers will catch the action and do something with it


export const  fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data})
}

export const  fetchProducts = (type) => async dispatch => {
  const res = await axios.get('/api/products',
    {params: {type}}
  )
  //get back array of data
  dispatch({ type: FETCH_PRODUCTS, payload: res.data})
}

export const fetchImage = () => async dispatch => {
  const res = await axios.get('/api/images')
  //get back array of data
  dispatch({ type: FETCH_IMAGE, payload: res.data})
}

export const fetchDetail = (id) => async dispatch => {
  console.log('id from fetchDetail actions index', id)
  const res = await axios.get('/api/detail',
    {params: {id}}
    )
  //returns an array
  dispatch ({type: FETCH_DETAIL, payload: res.data})
}

export const addToCart = (title, strId, color, size, quantity, price) => async dispatch => {
  const id = parseInt(strId)
  const res = await axios.get('/api/addToCart',
    {params: {title, id, color, size, quantity, price}}
  )
  //returns an array
  dispatch ({type: ADD_TO_CART, payload: res.data})
}

export const getCart = () => async dispatch => {
  const res = await axios.get('/api/getCart')
  //returns an array
  dispatch ({type: GET_CART, payload: res.data})
}

export const updateCartQuantity = (q)=>{
  //const quantity =
  return({type: UPDATE_CART_QUANTITY, payload: q})
}

export const editCart = (title, strId, color, size, quantity, price) => async dispatch => {
  const id = parseInt(strId)
  const res = await axios.get('/api/editCart',
    {params: {title, id, color, size, quantity, price}}
  )
  //returns cart array
  dispatch ({type: EDIT_CART, payload: res.data})
}

//i is the item's place in the cart array
export const removeItem = (i) => async dispatch =>{
  const res = await axios.get('/api/remove',
    {params: {i}}
  )
  //returns cart array
  dispatch ({type: REMOVE_ITEM, payload: res.data})
}
