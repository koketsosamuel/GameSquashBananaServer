const express = require("express")
const bp = require("body-parser")
const cors = require("cors")
const serverConf = require("./config/server")

const app = express()
app.use(bp.json())
app.use(cors())

const UserRoutes = require("./routes/Users")

// routes
app.use("/users", UserRoutes)

app.listen(process.env.PORT || serverConf.port)