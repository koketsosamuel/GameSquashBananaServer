const hash = require("salted-md5")
const qs = require("qs")

function genHashMd5(data) {

    let str = qs.stringify(data)
    //saltedHash = hash(str,phrase)
    return {str}
}

module.exports = genHashMd5