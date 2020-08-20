const fs = require("fs")

function getSettings(path) {

    fs.readFile(path, "utf-8", (err, settings) => {

        return JSON.parse(settings)

    })

}

module.exports = getSettings