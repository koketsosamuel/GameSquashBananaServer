const Sequelize = require("sequelize")

const database = new Sequelize('test', 'iotshop', 'K0k3t$00', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = database