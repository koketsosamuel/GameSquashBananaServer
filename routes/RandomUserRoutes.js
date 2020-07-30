const { Router } = require("express")
const RandomUser = require("../controllers/RandomUser")

let router = Router()

router.post("/", RandomUser.add)

module.exports = router