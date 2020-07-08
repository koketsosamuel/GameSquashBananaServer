const express= require("express")
const Products = require("../controllers/Products")
const router = express.Router()

router.get("/", Products.getAll)
router.get("/:id", Products.getOne)
router.post("/", Products.add)
router.put("/:id", Products.update)
router.delete("/:id", Products.remove)

module.exports = router