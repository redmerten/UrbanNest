/**
 * Created by CameronMerten on 10/12/17.
 */

const mongoose = require('mongoose')

const Product = mongoose.model('products')
//const images = require ('./images')


module.exports = (app) => {
  //current user is avail on the req obj as req.user
  app.get('/api/products', async (req,res) =>{

    //should be able to attach param in axios.get in react action
    //console.log('req from productRoutes', req)
    const products = await Product.find({'type':req.query.type}, 'id title type description image1 image2')
    //to include/exclude a property query.select('a -b c -d') neg for exclude.  Or ({a:1, b:0}) also works
    //.select('title, image1, image2')
    //send response back to requester
    //const prodObj= {id:products.id, {title}, image1:'images'}
    //console.log(' productRoute products', products)
    //probably want to find product details and assign all to an obj and return the obj
    //console.log(products)
    res.send(products)
  })

  app.get('/api/detail', async (req, res) => {
    //console.log('req from detailtRoutes', req)
    //console.log('req query ', req.query.id )
    //console.log(typeof req.query.id)
    const detail = await Product.findOne({'id':req.query.id},
     (err)=> {
       if (err) console.log('cant find ', req.query.id)

     })
    //console.log('detail',detail)
    res.send(detail)
  })


}