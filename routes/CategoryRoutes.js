const express = require("express")
const Categories = require("../controllers/Categories")
const verifyAuth = require("../middleware/verifyAuth")
const router = express.Router()

router.get("/", Categories.getAll)
router.get("/:id", Categories.getOne)
router.post("/", verifyAuth, Categories.add)
router.put("/:id", verifyAuth, Categories.update)
router.delete("/:id", verifyAuth, Categories.remove)

module.exports = router