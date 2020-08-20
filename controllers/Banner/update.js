const Banner = require("../../models/Banner")
const errorMsg = require("../../util/errorMsg")
const imageResize = require("../../util/imageResize")
const fs = require("fs")

function update(req, res) {

    Banner.findOne({_id: req.params.bannerId}, async (err, banner) => {
        
        if(err || !banner) return res.json({err: errorMsg("Error updating banner")})
        console.log(banner._doc)

        banner.title = req.body.title
        banner.link = req.body.link || null
        banner.removeAt = req.body.removeAt || null


        if(req.file) {
            await fs.unlink(banner.image, async () => {

                let out = "./upload/banner/"+String(Math.random() * 20000) + req.file.originalname
                await imageResize(req.file.path, out, 1400, true, (6/16))
                banner.image = out
                banner.save(err => {
                    if(err) return res.json({err: errorMsg("Error updating banner")})
                    res.json({msg: "Banner updated!"})
                })
            })
        }

    })

}

module.exports = update