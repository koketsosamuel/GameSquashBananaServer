const express = require("express")
const bp = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const serverConf = require("./config/server")
const cp = require("cookie-parser")
const authConf = require("./config/auth")
const dbConf = require("./config/database")

const app = express()
app.use(bp.json())
app.use(cp(authConf.cookieSecret, authConf.cookieConf))
app.use(cors({credentials: true, origin: "http://localhost:8080"}))
mongoose.connect(dbConf.connStr, dbConf.options);

const UserRoutes = require("./routes/UserRoutes")
const CategoryRoutes = require("./routes/CategoryRoutes")
const SubCategoryRoutes = require("./routes/SubCategoryRoutes")

// routes
app.use("/users", UserRoutes)
app.use("/categories", CategoryRoutes)
app.use("/subcategories", SubCategoryRoutes)



app.listen(process.env.PORT || serverConf.port)