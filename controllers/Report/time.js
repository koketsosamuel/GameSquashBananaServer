const Product = require("../../models/Product")
const User = require("../../models/User")
const Order = require("../../models/Order")
const Category= require("../../models/Category")
const moment = require("moment")

async function time(req, res) {
    
    let rep = {
        newOrders: 0,
        newUsers: 0,
        newProducts: 0,
        newCategories: 0,
        categoryProducts: [],

        deliveredOrders: 0,
        awaitingDeliveryOrders: 0,
        cancelledOrders: 0,
    }

    let date = new Date(new Date(Date.now()).setHours(0, 0, 0))
   

    if(req.query.time) {
        if(req.query.time === 'D') {
            date = new Date(new Date().setHours(0, 0, 0))
        } else if(req.query.time === 'W') {
            date = new Date(moment().subtract(7, 'days').format())
        } else if (req.query.time === 'Y') {
            date = new Date(moment().subtract(1, 'year').format())
        } else if(req.query.time === 'M'){
            date = new Date(moment().subtract(1, 'month').format())
        }
    }

    await Product.countDocuments().where('createdAt').gte(date).exec((err, count) => {
        rep.newProducts = count
    })

    await User.countDocuments().where('createdAt').gte(date).exec((err, count) => {
        rep.newUsers = count
    })

    await Category.countDocuments().where('createdAt').gte(date).exec((err, count) => {
        rep.newCategories = count
    })

    await Order.countDocuments().where('createdAt').gte(date).exec((err, count) => {
        rep.newOrders = count
    })

    await Category.find({}, async (err, cats) => {
        await cats.forEach(async c => {
            await Product.countDocuments({category: c._id, createdAt: {$gte: date}}, (err, count) => {
                rep.categoryProducts.push({category: c.name, products: count});
            })
        })
    })

    await Order.countDocuments({status: 0, createdAt: {$gte: date}}, (err, count) => {
        rep.cancelledOrders = count
    })

    await Order.countDocuments({status: 1, createdAt: {$gte: date}}, (err, count) => {
        rep.awaitingDeliveryOrders = count
    })

    await Order.countDocuments({status: 2, createdAt: {$gte: date}}, (err, count) => {
        rep.deliveredOrders = count
    })

    res.json({results: rep})

}

module.exports = time