const Banner = require("../../models/Banner")
const imageResize = require("../../util/imageResize")
const errorMsg = require("../../util/errorMsg")

async function add(req, res) {

    let out = "./upload/banner/"+String(Math.random() * 20000) + req.file.originalname

    await imageResize(req.file.path, out, 1400, true, (6/16))

    let newBanner = new Banner({
        title: req.body.title,
        link: req.body.link,
        removeAt: req.body.removeAt,
        image: out
    })

    newBanner.save(err => {
        if(err) return res.json({err: errorMsg("Error adding banner")})
        res.json({msg: "Banner added!"})
    })

}

module.exports = add