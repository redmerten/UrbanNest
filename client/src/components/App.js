import React, {Component} from 'react'
//helpers for the dom
//Route - set of rules between route and what is visible
//BrowserRouter - looks at url and changes components; can only have 1 child
//Both are react components
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux' //allows react component to call action creator
import * as actions from '../actions'
//app will show all components
import '@blueprintjs/core/dist/blueprint.css'
//import {Popover, Menu} from '@blueprintjs/core'

//dummy routes for setup and initial test
/*
const Header = () => <h2>Header</h2>
const Landing = () => <div style={{"padding":"50px"}}><h2 >Landing</h2></div>
const Oauth = () => <h2 style={{'textAlign': 'center', "padding":"50px"}}> o auth </h2>

*/

import Header from './Header'
import Landing from './Landing'
import ProductDetail from './ProductDetail'
import Footer from './Footer'
import Cart from './Cart'

//const Cart = () => <h2 style={{'textAlign': 'center', "padding":"100px"}}>Cart</h2>
//const OrderHistory = () => <h2 style={{'textAlign': 'center', "padding":"50px"}}>Order History</h2>

class  App extends Component {
  //fetch current user
  componentDidMount(){
    this.props.fetchUser()
  }



  //header will be different depending on whether user is logged in
  //should be in header?
  //"/" = urbannest.com/  or home
  // react uses closest match so make sure "/" is last or it also will display or use exact
    render () {
      return (
        <div>
          <BrowserRouter>
            <div>
              <Header/>
              <Route path="/cart" component={Cart}></Route>
              <Route exact path="/" component={Landing}></Route>
              <Route path="/detail/:prodid" component={ProductDetail}/>
              <Footer/>
            </div>
          </BrowserRouter>
        </div>

      )
    }
}

//this is imported by main index.js

export default connect(null, actions)(App)
