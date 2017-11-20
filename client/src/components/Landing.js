/**
 * Created by AndreaMerten on 10/1/17.
 */

import React, {Component} from 'react'
//import {connect} from 'react-redux'
//import {fetchProducts} from '../actions/index'
//import axios from 'axios'
//import {Icon} from 'react-fa'
import ProductList from './ProductList'


class Landing extends Component {

  render(){
    //console.log('landing props', this.state.props)
    return (
      <div style={{'textAlign': 'center', "paddingTop":"80px", 'marginLeft':'50px', 'width':'960px'}}>
        <ProductList/>
      </div>

    )}
}

export default Landing