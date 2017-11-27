/**
 * Created by AndreaMerten on 10/18/17.
 */

import React, {Component} from 'react'
//needs data from redux so use connect
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, fetchImage} from '../actions' //no need to say index cuz it knows
import '@blueprintjs/core/dist/blueprint.css'

const cardStyle ={
  float: 'left',
  width: '250px',
  height: '200px',
  marginRight: '20px',
  marginBottom: '20px',
  borderColor:'0 0 0',
  border:"none",
  color:'0 0 0'
}

class ProductList extends Component {
  componentDidMount(){
    this.props.fetchProducts('Sheets')
    //this.props.fetchImage() //still figuring out how to get an image from server side
  }

  renderProducts(){
    return this.props.products.map(p =>{
      //console.log('type of ',typeof p.id)
      const id=p.id.toString()
      return(
        <div className="docs-card-example" key={p.id}>
          <Link to={`/detail/${id}` } >
            <div className="pt-card pt-elevation-0 pt-minimal pt-interactive" style={cardStyle}>
              <h5>{p.title}</h5>
              {/*<img src={p.image1._id} alt=''/>*/}
              {/*<p>{p.type}</p>*/}
              <p>{p.description}</p>
            </div>
          </Link>
        </div>
      )
    })
  }


  render(){
    return(
    <div className="docs-card-example">
      {this.renderProducts()}
    </div>

    )
  }
}

//feed component state props
//if just products part replace state with {products}
const mapStateToProps = (state) =>{
  return state
}

export default connect(mapStateToProps, {fetchProducts, fetchImage})(ProductList)