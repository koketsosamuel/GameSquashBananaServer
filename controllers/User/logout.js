function logout(req, res) {

    req.session = null
    res.json({msg: "Logged out!"})

}

module.exports = logout