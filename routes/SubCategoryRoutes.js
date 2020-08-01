const express = require("express")
const SubCategories = require("../controllers/SubCategory")
const verifyAuth = require("../middleware/verifyAuth")
const router = express.Router()

router.get("/:categoryId", SubCategories.getForCategory)
router.get("/one/:subCategoryId", SubCategories.getOne)
router.post("/", SubCategories.add)
router.put("/:subCategoryId", SubCategories.update)
router.delete("/:subCategoryId", SubCategories.remove)

module.exports = router
