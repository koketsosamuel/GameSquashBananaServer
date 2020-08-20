const Address = require("../../models/Address")
const errorMsg = require("../../util/errorMsg")


function add(req, res) {

    let newAddress = new Address({
        city: req.body.city,
        address1: req.body.address1,
        address2: req.body.address2,
        postalCode: req.body.postalCode,
        province: req.body.province,
        additionalInfo: req.body.additionalInfo,
        recipientName: req.body.recipientName,
        recipientPhone: req.body.recipientPhone,
        surburb: req.body.surburb,
        user: req.user._id
    })

    newAddress.save((err, doc) => {
        if(err) return res.json({err: errorMsg("Error saving address!")})
        res.json({msg: "Address added!", results: doc._doc})
    })

}


module.exports = add