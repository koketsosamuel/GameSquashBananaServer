const RandomUser = require("../../models/RandomUser");
const errorMsg = require("../../util/errorMsg");

function add(req, res) {

    let newRU = new RandomUser({})
    newRU.save((err, doc) => {
        if(err) return res.json({err: errorMsg("Unexpected Error")})
        res.cookie("_youdontexist", doc._id)
        res.json({})
    })

}

module.exports = add