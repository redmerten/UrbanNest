/**
 * Created by CameronMerten on 10/11/17.
 */
//require this file into index.js

const mongoose = require('mongoose')
const {Schema} = mongoose // mongoose.Schema

const imageSchema = new Schema({
  img: {data: Buffer, contentType: String}
})

// const inventorySchema = new Schema({
//   prodId: String,
//   price: Number,
//   size: String,
//   color: String
// })

//add product here
const productSchema = new Schema ({
  title: String,
  id: String,
  description: String,
  type: String,
  subtype: String,
  image1:imageSchema,
  image2:imageSchema,
  collectiontype:String,
  season: String,
  holiday: String,
  addedDate: Date,
  price: [Number],
  options: {size:[String], color:[String]},
  tags: [String]

})

//tell mongoose to create a new collection called users
mongoose.model('image', imageSchema)
mongoose.model('products', productSchema)

//fill the database
