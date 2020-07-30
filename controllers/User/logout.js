function logout(req, res) {

    req.session.auth = null
    res.json({msg: "Logged out!"})

}

module.exports = logout