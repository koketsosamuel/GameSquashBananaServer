const { Router } = require("express")
const Report = require("../controllers/Report")

const router = Router()

router.get("/users", Report.users)
router.get("/products", Report.products)
router.get("/categories", Report.categories)
router.get("/orders", Report.orders)

module.exports = router