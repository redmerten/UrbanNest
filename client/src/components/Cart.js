/**
 * Created by AndreaMerten on 11/16/17.
 */


import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCart} from '../actions'
import _ from 'lodash'
import Flexbox from 'flexbox-react'
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

//0: {id: 1233, color: "white", size: "twin", quantity: 1, _id: "5a0de81ae307e8d5afe9d88d"}length: 1__proto__: Array(0)

class Cart extends Component {

  render() {
    const divStyle = {
      float: 'left',
      width: '200px',
      marginRight: '20px',
      listStyle: 'none'
    }

    const {items} = this.props.cart || []
    if (!items){
      return (<div>Cart is Empty</div>)
    }
  else
    {
      console.log('cart from cart', items)
      return (
        <div style={{'display': 'flex', 'padding': '100px'}}>

          {items.map((e, i) => {
            return (
              <div key={i}>
                <h4>{e.title}</h4>
                <div style={divStyle}>
                  Holder for image
                </div>
                <div style={divStyle}>
                  <p>Item: #{e.id}</p>
                  <p>Color: {e.color}</p>
                  <p>Size: {e.size} </p>

                  <p>Quantity: {e.quantity}</p>
                </div>

                <div style={divStyle}>
                  <div>
                    <button className="pt-button pt-minimal">Edit</button>
                  </div>
                  <div>
                    <button className="pt-button pt-minimal">Remove</button>
                  </div>
                </div>
                <div style={divStyle}>
                  ${e.price}
                </div>
              </div>
            )
          })}
        </div>
      )

    }
  }
}


const mapStateToProps = (state) => {
  return state

}
export default connect(mapStateToProps)(Cart)