const { Router } = require("express")
const BannerController = require("../controllers/Banner")
const upload = require("../util/upload")

const router = Router()

router.post("/", upload.single("banner"), BannerController.add)
router.get("/", BannerController.getAll)
router.get("/:bannerId", BannerController.getOne)
router.put("/:bannerId", upload.single("banner"), BannerController.update)
router.delete("/:bannerId", BannerController.remove)

module.exports = router