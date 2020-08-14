const User = require("../../models/User");
const errorMsg = require("../../util/errorMsg")


function roleAssignment(req, res) {

    let body = req.body

    User.updateOne({_id: req.params.userId}, {

        isAdmin: body.isAdmin || false,
        isOrderManager: body.isOrderManager || false,
        isProductManager: body.isProductManager || false,
        isDeliveryManager: body.isDeliveryManager || false

    }, (err) => {
        if(err) return res.json({err: errorMsg("Error modify user roles")})
        res.json({msg: "Roles modified!"})
    })

}

module.exports = roleAssignment