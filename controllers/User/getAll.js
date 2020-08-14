const User = require("../../models/User")
const errorMsg = require("../../util/errorMsg")

function getAll(req,res) {

    let find
    let total
    let perpage = req.query.perpage || 5
    let page = req.query.page || 1

    if(!(perpage > 0)) perpage = 16
    if(!(page > 0)) page = 1

    if(req.query.s) find = User.search(req.query.s)
    else find = User.find({})

    if(req.query.isAdmin) find.where("isAdmin").equals(true)
    if(req.query.isProductManager) find.where("isProductManager").equals(true)
    if(req.query.isDeliveriesManager) find.where("isDeliveriesManager").equals(true)
    if(req.query.isOrderManager) find.where("isOrderManager").equals(true)
    if(req.query.banned) find.where("banned").equals(true)

    find.exec((err, users = []) => {
        
        if(err) return res.json({err: errorMsg("Error fetching users")})
        total = users.length
        let pages = Math.ceil(total / perpage)

        if(page > pages && pages != 0) page = pages

        let nUsers = users.splice((page - 1) * perpage, perpage)
        res.json({nav: {page, perpage, pages, total}, results: nUsers})

    })


}

module.exports = getAll