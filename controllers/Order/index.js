const add = require("./add")
const receive = require("./receivePayment")
const getPerUser = require("./getPerUser")
const getAll = require("./getAll")
const changeStatus = require("./changeStatus")
const getOne = require("./getOne")

module.exports = {
    add,
    receive,
    getPerUser,
    getAll,
    changeStatus,
    getOne
}