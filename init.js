const dbConf = require("./config/database")

mongoose.connect(dbConf.connStr, dbConf.options)
const Category = require("./models/Category")
const errorMsg = require("./util/errorMsg")

Category.find({})
	.where("name")
	.equals("KOKO")
	.exec((err, res) => {
		console.log(res)
	})
