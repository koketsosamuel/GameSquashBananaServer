
function receive(req, res) {

    console.log(req.body, req.query)
    res.status(200)
}

module.exports = receive