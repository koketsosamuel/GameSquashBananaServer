const errorMsg = require("./errorMsg")

const pagination = async (Model, page, perpage, conditions = {}, sort = {createdAt: "desc"}) => {

    let docsCount
    let pages
    let limit = perpage

    if(conditions == {}) {
        await Model.estimatedDocumentCount((err, count) => {
            if(err) return false
            docsCount = count
        })
    } else {
        await Model.countDocuments(conditions,(err, count) => {
            if(err) return false
            docsCount = count
        })
    }

    pages = Math.ceil(docsCount/perpage)
    if(page > pages) page = pages
    if(page < 1) page = 1

    if(limit < 5) limit = 5

    

}