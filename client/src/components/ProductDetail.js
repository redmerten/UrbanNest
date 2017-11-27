/**
 * Created by AndreaMerten on 10/19/17.
 */
import React, {Component} from 'react'
//needs data from redux so use connect
import {connect} from 'react-redux'
import _ from 'lodash'
import {fetchDetail, addToCart, updateCartQuantity} from '../actions' //no need to say index cuz it knows
import sheet1  from '../images/sheet1.png'
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

////////////////BINDING ISSUE

class ProductDetail extends Component {
  state={
        size:'',
        color:'',
        quantity:1,
        price:0,
        sizeSelected:false,
        colorSelected:false,
  }

  //call addToCart action
  //title, strId, color, size, quantity, price
  addToCart(title){
    if (this.state.sizeSelected && this.state.colorSelected) {
      this.props.addToCart(
        title,
        this.props.match.params.prodid,
        this.state.color,
        this.state.size,
        this.state.quantity,
        this.state.price
      )
      //this.props.updateCartQuantity(this.state.quantity)
      //do I reset state quantity here?? state resets on rerender
    }
  }

  componentDidMount(){
     this.props.fetchDetail(this.props.match.params.prodid)}


  render() {
    console.log('state from detail', this.state)
    const detail = this.props.detail || {}
    const {title, description } = this.props.detail
    const priceArr = this.props.detail.price || []
    //console.log(priceArr)
    //const color= this.props.detail.options? this.props.detail.options.color || [] :[];
    const color = _.get(this.props.detail.options, 'color') || []
    //const size= this.props.detail.options? this.props.detail.options.size || [] :[];
    const size = _.get(this.props.detail.options, 'size') || []
    //console.log('detailed props from productDetail', detail )


    //----------styles-----------------------------

    const detailStyle = {
      paddingTop:"80px",
      marginTop:'50px',
      marginLeft:'50px',
      width:'960px'
    }

    const thumbnailDivStyle = {
      //marginLeft: '10px',
      width: '150px',
      float: 'left'
    }

    const mainPicDivStyle = {
      marginLeft: '75px',
      width: '350px',
      float: 'left'
    }

    const rightDivStyle = {
      marginLeft: '75px',
      width: '250px',
      float: 'left'
    }

    //placeholders for small images
    const thumbnails = ['thumbnail1','thumbnail2','thumbnail3','thumbnail4']

    const renderArrays=(propArr=[])=>{
      return(
        propArr.map((p,i) => {
          return (
            <div key={i} style={{'height': '75px'}}>
              <h3>{p}</h3>
            </div>
          )
        })
      )
    }

    const renderQuantityMenu=() =>{
      const nums = [1,2,3,4,5]
       return(
        <Menu>
          {nums.map((p,i)=>{
            return(
              <MenuItem text={p} key={i} onClick={() => {
                  this.setState({quantity: p})
                }
              }/>
            )})}
        </Menu>
       )
    }


    const renderMenu=(propArr=[], type)=>{
      return(
        <Menu>
          {propArr.map((p,i)=>{
            return(
              <MenuItem text={p} key={i} onClick={() => {
                if (type === 'color') {
                  this.setState({color: p, colorSelected: true})
                }

                else {
                  this.setState({size: p, sizeSelected: true})
                  const which = size.indexOf(p)
                  let price
                  if (which>priceArr.length-1)
                  price = priceArr[priceArr.length-1]
                  else  price = priceArr[which]
                  console.log('price', typeof(p), size, this.state.size, which, price, priceArr)
                  this.setState({price})
                }
              }}/>
            )})
          }
        </Menu>
      )
    }

    const renderSizeChoice=()=>{
       if (this.state.sizeSelected)
         return(<button className="pt-button pt-minimal pt-icon-chevron-down">{this.state.size}</button>)
       else
         return(<button className="pt-button pt-minimal pt-icon-chevron-down">Size</button>)
      }


    const renderColorChoice=()=>{
      let color
      if (this.state.colorSelected)
        color=this.state.color
      else color = 'Color'
      return (<button className="pt-button pt-minimal pt-icon-chevron-down">{color}</button>)
    }

    const renderPrice=()=>{
      if (this.state.size === '')
        return (<div/>)
      else{
        return (<div style={{'marginTop':'20px', 'marginLeft':'50px'}}>${this.state.price}</div>)
      }
    }



    return (
      <div style={detailStyle}>
        <div style={thumbnailDivStyle}>
          {renderArrays(thumbnails)}
        </div>
        <div style= {mainPicDivStyle}>
          <h5>{title}</h5>
          <div><img src={sheet1} alt=""></img></div>

        </div>
        <div style={rightDivStyle}>
          <p>{description}</p>
          <div >
            <Popover
              content={renderMenu(size,'size')}
              interactionKind={PopoverInteractionKind.HOVER}
              position={Position.BOTTOM}
            >
              {renderSizeChoice()}
            </Popover>
            <Popover
              content={renderMenu(color,'color')}
              interactionKind={PopoverInteractionKind.HOVER}
              position={Position.BOTTOM}
            >
              {renderColorChoice()}
            </Popover>
            <Popover
              content={renderQuantityMenu()}
              interactionKind={PopoverInteractionKind.HOVER}
              position={Position.BOTTOM}
            >
              <button className="pt-button pt-minimal pt-icon-chevron-down">Quantity: {this.state.quantity}</button>
            </Popover>
          </div>
          <div>
            {renderPrice()}
          </div>
          <div>
            <button className="pt-button" style={{'margin':'20px'}} onClick = {()=>{this.addToCart(title)}}>
              Add To Cart
            </button>
          </div>
        </div>


      </div>

    )
  }

}
      //feed component state props
      //if just products part replace state with {products}
const mapStateToProps = ({detail}) =>{
  return {detail}
}

       //export default connect(mapStateToProps, {fetchDetail})(ProductDetail)
export default connect(mapStateToProps, {fetchDetail, addToCart, updateCartQuantity})(ProductDetail)