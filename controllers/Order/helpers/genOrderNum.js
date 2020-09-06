
function genOrderNum() {
    return Math.ceil(Math.random() * 9876543) + (Math.floor(1234 * Math.random()) + 1000)
}

module.exports = genOrderNum