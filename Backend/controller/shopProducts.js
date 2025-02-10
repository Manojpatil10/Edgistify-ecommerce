const shopProducts = require('../model/products');

exports.shopProducts=(req,res,next)=>{
  shopProducts.find().then((success)=>{
    res.status(200).json({products:success})
  }).catch((error)=>{
    console.log(error)
  })
}