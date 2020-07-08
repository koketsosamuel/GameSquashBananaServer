const errorMsg = require("../util/errorMsg")
const Category = require("../models/Category")

module.exports = {

    add,
    update,
    remove,
    getAll,
    getOne    

}

function add(req, res) {

    let newCat = new Category({
        name: req.body.name,
        description: req.body.description
    })

    newCat.save(err => {
        
        if(err) return res.json({err: errorMsg("Error adding category")})

        res.json({msg: "Category created!"})

    })

}

async function remove(req, res) {
    
    
    Category.remove({
        _id: req.params.id
    }, err => {
        
        if(err)  return res.json({err: errorMsg("Error removing category! Try again!")})

        res.json({msg: "Category removed!"})

    })


}

function getAll(req, res) {

    Category.find({}, (err, results) => {

        if(err) return  res.json({err: errorMsg("Error fetching categories")})

        res.json({results})

    })

}

function getOne(req, res) {

    Category.findOne({        
        _id: req.params.id        
    }, (err, results) => {

        if(err) return res.json({err: errorMsg("Error fetching category")})

        res.json({results})

    })

}

function update(req, res) {

    Category.updateOne({
        _id: req.params.id
    }, {
        name: req.body.name,
        description: req.body.description,
        manager: req.body.manager || null,
        updatedAt: Date.now
    }, err => {

        if(err) return res.json({err: errorMsg("Error updating category")})
        
        res.json({msg: "Category updated!"})

    })

}