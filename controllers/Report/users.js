const User = require("../../models/User")

async function users(req, res) {

    let userReport = {
        total: 0,
        banned: 0,
        newToday: 0
    }

    await User.find({}, (err, users) => {
        userReport.total = users.length
    })

    await User.find({banned: true}, (err, users) => {
        userReport.banned = users.length || 0
    })

    let d = new Date()
    let today = d.getFullYear().toString() + "-" + d.getMonth().toString() + "-" + d.getDate().toString()

    User.find({createdAt: {$gte: today}}, (err, users) => {
        userReport.newToday = users.length
        res.json({results: userReport})
    })

}

module.exports = users