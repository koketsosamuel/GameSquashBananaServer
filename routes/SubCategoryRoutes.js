const express = require("express")
const SubCategories = require("../controllers/SubCategory")
const verifyAuth = require("../middleware/verifyAuth")
const router = express.Router()

router.get("/:id", SubCategories.getForCategory)
router.get("/one/:id", SubCategories.getOne)
router.post("/", SubCategories.add)
router.put("/:id", SubCategories.update)
router.delete("/:id", SubCategories.remove)

module.exports = router
