const errorMsg = require("../util/errorMsg")
const SubCategory = require("../models/SubCategory")

module.exports = {

    add,
    update,
    remove,
    getAll,
    getOne    

}

function add(req, res) {

    let newCat = new SubCategory({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category
    })

    newCat.save(err => {
        
        if(err) return res.json({err: errorMsg("Error adding sub-category")})

        res.json({msg: "sub-category created!"})

    })

}

async function remove(req, res) {
    
    
    SubCategory.remove({
        _id: req.params.id
    }, err => {
        
        if(err)  return res.json({err: errorMsg("Error removing sub-category! Try again!")})

        res.json({msg: "sub-category removed!"})

    })


}

function getAll(req, res) {

    SubCategory.find({}, (err, results) => {

        if(err) return  res.json({err: errorMsg("Error fetching sub-categories")})

        res.json({results})

    })

}

function getOne(req, res) {

    SubCategory.findOne({        
        _id: req.params.id        
    }, (err, results) => {

        if(err) return res.json({err: errorMsg("Error fetching sub-category")})

        res.json({results})

    })

}

function update(req, res) {

    SubCategory.updateOne({
        _id: req.params.id
    }, {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        updatedAt: Date.now
    }, err => {

        if(err) return res.json({err: errorMsg("Error updating sub-category")})
        
        res.json({msg: "sub-category updated!"})

    })

}