const express = require("express")
const bp = require("body-parser")
const cors = require("cors")
const serverConf = require("./config/server")
const cp = require("cookie-parser")
const authConf = require("./config/auth")
const dbInit = require("./util/databaseInit")

const app = express()
app.use(bp.json())
app.use(cp(authConf.cookieSecret, authConf.cookieConf))
app.use(cors({credentials: true, origin: "http://localhost:8080"}))

const UserRoutes = require("./routes/UserRoutes")
const CategoryRoutes = require("./routes/CategoryRoutes")

dbInit()

// routes
app.use("/users", UserRoutes)
app.use("/categories", CategoryRoutes)



app.listen(process.env.PORT || serverConf.port)