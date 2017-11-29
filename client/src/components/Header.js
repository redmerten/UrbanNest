/**
 * Created by AndreaMerten on 9/28/17.
 */


import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCart, fetchUser, fetchProducts} from '../actions'
import _ from 'lodash'
import {
  //Button,
  Menu,
  MenuItem,
  //MenuDivider,
  PopoverInteractionKind,
  Popover,
  Position
} from "@blueprintjs/core"
import '@blueprintjs/core/dist/blueprint.css'
//import {Icon} from 'react-fa'

const popOverStyle = {
  marginLeft: '50px'
}

const beddingTypes = ['Sheets', 'Duvets', 'Pillows']
const tableTypes = ["Table Cloths","Napkins" , "Runners" ]

class Header extends Component {

  componentDidMount() {
    this.props.fetchUser()
    this.props.getCart()

  }

  renderProductMenu(type) {
    return(
    <Menu>
    {type.map((b,i) => {
      return(
        <Link to={"/"} key={i}>
         <MenuItem text={b}  onClick={()=>this.props.fetchProducts(b)}/>
        </Link>
      )
    })}
    </Menu>
    )
}
  renderLoginContent() {
    //console.log('render', this.props.auth)
    switch (this.props.auth){
      case null:
        return (
          <div/>
        )
      case false:
        return (
          <button className="pt-button pt-minimal pt-icon-chevron-down">
            Sign In
          </button>
        )
      default:  //this will be logged in
        //console.log('render', this.props.auth)
        //this.props.getCart()
        //console.log('cart', this.props.cart)
        return (
          <button className="pt-button pt-minimal pt-icon-chevron-down">
            Hi, {this.props.auth.name.givenName}
          </button>
        )
    }
  }

  renderLoginPopoverContent(){
    switch (this.props.auth){
      case null:
        return (
          <div/>
        )
      case false:
        return (
          <Menu>
            <MenuItem text="Login with Google" href="/auth/google"/>
          </Menu>
        )
      default:  //this will be logged in

        return (
          <Menu>
            <MenuItem text="Logout" href="/api/logout"/>
          </Menu>
        )
    }
  }

  renderCartQuantity(){
    switch (this.props.auth){
    case null:
      return (<p/>)
    case false:
      return (<p/>)
    default:  //this will be logged in
      //console.log('from cart q', this.props.cart.items)
      if (this.props.cart.items) {
        const q= this.props.cart.items.reduce((acc, e)=>{return (acc+e.quantity)},0)

        return (<p style={{'marginTop': '10px'}}>{q}</p>)
      }
      else return(<p/>)
    }
  }

  linkToCart(){
    switch (this.props.auth){
      case null:
        return (<button className="pt-button pt-minimal pt-icon-shopping-cart"></button>)
      case false:
        return (<button className="pt-button pt-minimal pt-icon-shopping-cart"></button>)
      default:
        if (this.props.cart.items){
          const q= this.props.cart.items.reduce((acc, e)=>{return (acc+e.quantity)},0)
          return (
            <Link to={`/cart` }>
              <button className="pt-button pt-minimal pt-icon-shopping-cart"></button>
            </Link>
          )
        }
        else return(<button className="pt-button pt-minimal pt-icon-shopping-cart"></button>)

        // switch(q) {
        //   case 0 || null || false:
        //     return (<button className="pt-button pt-minimal pt-icon-shopping-cart"></button>)
        //   default:
        //     return (
        //       <Link to={`/cart` }>
        //         <button className="pt-button pt-minimal pt-icon-shopping-cart"></button>
        //       </Link>
        //     )
        // }
    }
  }

  render(){
    console.log('header props', this.props)
    const cart = _.get(this.props.cart, 'items') || []
    //console.log('lodash', cart, cart.length)//, cart[0].quantity)
    let q =0
    if(cart.length > 0 ) {
      //console.log(cart[0].quantity)
      q = cart.reduce((acc, {quantity}) => {
        return acc + quantity
       },0) //init value will be object if not set to 0
       //console.log('q', q)
     }
    return (
      <nav
        className="pt-navbar pt-fixed-top "
        style = {{
          "borderBottomColor":"0 0 0",
          "boxShadow": "0 0 0 0",
          "border":"0",
          "margin":"30px 50px"
        }}
      >
        <div className="pt-navbar-group pt-align-left">
          <Link to={'/'} className="pt-navbar-heading">UrbanNest</Link>

          <div style={popOverStyle}>
            <Popover
              content={this.renderProductMenu(beddingTypes)}
              interactionKind={PopoverInteractionKind.HOVER}
              position={Position.BOTTOM}
            >
              <button className="pt-button pt-minimal">Bed</button>
            </Popover>

            <Popover content={this.renderProductMenu(tableTypes)}
                     interactionKind={PopoverInteractionKind.HOVER}
                     position={Position.BOTTOM}
            >
              <button className="pt-button pt-minimal">Table </button>
            </Popover>
          </div>
        </div>

        <div className="pt-navbar-group pt-align-right">
          <div style={popOverStyle}>
            <Popover
              content={this.renderLoginPopoverContent()}
              interactionKind={PopoverInteractionKind.HOVER}
              position={Position.BOTTOM}
            >
              {this.renderLoginContent()}

            </Popover>
          </div>

          <button className="pt-button pt-minimal pt-icon-search">Search</button>

          {this.linkToCart()}
          {this.renderCartQuantity()}
        </div>
      </nav>
  )}
}

//connect to entire redux store -> looking only for state.auth
const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps,{getCart, fetchUser, fetchProducts})(Header)