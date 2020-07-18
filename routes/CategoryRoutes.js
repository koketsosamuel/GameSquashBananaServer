const express = require("express")
const Categories = require("../controllers/Category")
const verifyAuth = require("../middleware/verifyAuth")
const router = express.Router()

router.get("/", Categories.getAll)
router.get("/:categoryId", Categories.getOne)
router.post("/", Categories.add)
router.put("/:categoryId", Categories.update)
router.delete("/:categoryId", Categories.remove)

module.exports = router
