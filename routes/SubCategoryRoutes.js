const express = require("express")
const SubCategories = require("../controllers/SubCategoryController")
const verifyAuth = require("../middleware/verifyAuth")
const router = express.Router()

router.get("/:id", SubCategories.getAll)
router.get("/one/:id", SubCategories.getOne)
router.post("/", verifyAuth, SubCategories.add)
router.put("/:id", verifyAuth, SubCategories.update)
router.delete("/:id", verifyAuth, SubCategories.remove)

module.exports = router