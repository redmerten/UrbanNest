/**
 * Created by CameronMerten on 10/12/17.
 */

const mongoose = require('mongoose')
const Cart = mongoose.model('carts')
const Product = mongoose.model('products')
const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {
  //current user is avail on the req obj as req.user
  //see if cart exists
  //either add to it or make a new one
  app.get('/api/getCart', requireLogin, async (req,res) =>{
    const userCart = await Cart.findOne({_user: req.user.id}, (err)=> {
      if (err) {
        console.log('Error from getCart', err)
      }
      else {
        //to include/exclude a property query.select('a -b c -d') neg for exclude.  Or ({a:1, b:0}) also works
        //.select({???})
        //send response back to requester

        //probably want to find product details and assign all to an obj and return the obj
        //res.send(userCart)
      }
    })
    console.log('userCart cartRoute', userCart)
    res.send(userCart)
  })

  //
// items: [{
//   title: String,
//   id: Number,
//   color: String,
//   size: String,
//   quantity: Number,
//   price: Number
// }]

  app.get('/api/addToCart', requireLogin, async (req,res) =>{
    console.log('from api addtocart', req.query, req.user.id, req.query.id)
    const {title, id, color, size, quantity, price} = req.query
    const userCart = await Cart.findOne({_user: req.user.id}, (err)=> {
      if (err) {
        console.log('error from addtocart', err)
        //make a new cart
        //const {color, id, size, quantity} = req.body //eg title = req.body.title
      }
    })
      if (!userCart) {
        console.log('no cart')
        new Cart({
          _user: req.user.id,
          items: [{title, id, color, size, quantity, price}]
        }).save()
        const uCart = await Cart.findOne({_user: req.user.id}, (err)=> {
            if (err) {
              console.log('error from addtocart', err)
            }
          })
        res.send(uCart)
      }
      else {
        //add to card
        userCart.set({items: [...userCart.items, {title, id, color, size, quantity, price}]})
        userCart.save((err) => {
          if (err) console.log(err)
          res.send(userCart)
        })
        console.log('Cart from routes', userCart)
        //res.send(userCart)
      }
  })

  app.get('/api/remove', requireLogin, async (req,res) =>{
    console.log('from api remove', req.query.i)
    const {i} = req.query
    const userCart = await Cart.findOne({_user: req.user.id}, (err)=> {
      if (err) {
        console.log('error from addtocart', err)
        //make a new cart
        //const {color, id, size, quantity} = req.body //eg title = req.body.title
      }
    })
    if (!userCart) {
      console.log('no cart')

    }
    else {
      //add to card
      const items = userCart.items
      console.log('items before removal', items)
      items.splice(i, 1)
      console.log('items after removal', items)
      userCart.set({items: items})
      userCart.save((err) => {
        if (err) console.log(err)
        res.send(userCart)
      })
      console.log('Remove from Cart from routes', userCart)
      //res.send(userCart)
    }
  })

}