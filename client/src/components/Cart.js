/**
 * Created by AndreaMerten on 11/16/17.
 */


import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCart, fetchDetail, removeItem} from '../actions'
import _ from 'lodash'
import Flexbox from 'flexbox-react'
import {
  //Button,
 Overlay,
  Menu,
  MenuItem,
  //MenuDivider,
  PopoverInteractionKind,
  Popover,
  Position
} from "@blueprintjs/core"
import '@blueprintjs/core/dist/blueprint.css'

const overlayStyle ={
  display: 'flex',
  justifyContent: 'center',
  //width: '250px',
  //height: '200px'
  //marginRight: '20px',
  //marginBottom: '20px',
  //borderColor:'0 0 0',
  //border:"none",
  //color:'0 0 0'
}

class Cart extends Component {
  state = {
    isOpen: false,
    i: 0
  }

  toggleOverlay=()=>{
    console.log('toggle',this.state.isOpen)
    this.setState({isOpen:!this.state.isOpen})
  }

  setEdit=(i, items)=>{
    this.setState({isOpen: true, i:i})
    this.props.fetchDetail(items[this.state.i].id)
  }

  remove=(i, items)=>{
    this.props.removeItem(i)
  }

  renderOverlay=(items)=>{
    console.log('Overlay', this.props.detail)
    return(
      <div className="pt-card pt-elevation-0 pt-minimal pt-interactive">
        <p>{items[this.state.i].title}</p>
        <p>{this.state.i}</p>
      </div>
    )
  }


  render() {
    console.log('cart state', this.state)
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
    else {
      console.log('cart from cart', items)
      //to make cart editable assign to the key to change to item in cart array?
      return (
        <div style={{'display': 'flex', 'flexDirection':'column', 'padding': '100px'}}>

          {items.map((e, i) => {
            return (
              <div key={i} style={{'marginBottom':'50px'}}>
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
                    <button
                      className="pt-button pt-minimal"
                      onClick = {()=>this.setEdit(i,items)}
                    >
                      Edit
                    </button>
                    <Overlay isOpen={this.state.isOpen}
                             onClose={this.toggleOverlay}
                             style={overlayStyle}
                    >
                      {/*<div className="pt-card pt-elevation-0 pt-minimal pt-interactive">*/}
                        {/*<p>{items[this.state.i].title}</p>*/}
                        {/*<p>{this.state.i}</p>*/}
                      {/*</div>*/}

                      {this.renderOverlay(items)}
                    </Overlay>
                  </div>
                  <div>
                    <button className="pt-button pt-minimal"
                            onClick= {()=>this.remove(i, items)}
                    >
                      Remove
                    </button>
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
export default connect(mapStateToProps, {fetchDetail, removeItem})(Cart)