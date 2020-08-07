const fs = require("fs")

function removeFile(path) {

    fs.unlink(path, () => {
        
    })

}

module.exports = removeFile