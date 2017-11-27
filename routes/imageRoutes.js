/**
 * Created by CameronMerten on 10/18/17.
 */


//const mongoose = require('mongoose')

//const Product = mongoose.model('products')
//const images = require ('./images')


module.exports = (app) => {
  //current user is avail on the req obj as req.user
  app.get('/api/images', async (req,res) =>{
    const imgFolder= __dirname + '../images'
    //require file system
    const fs=require('fs')
    fs.readdir(imgFolder, (err, files)=> {
      if (err) return console.log(err)

      const filesArr = []
      files.forEach(f => filesArr.push({imgfile: f}))
      res.send(filesArr)
    })
  })
}

