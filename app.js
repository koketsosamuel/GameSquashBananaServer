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
// app.use(cors({ credentials: true, origin: "http://localhost:8080" }))
app.use(cors())
mongoose.connect(dbConf.connStr, dbConf.options)

app.use("/upload", express.static("./upload"))

const UserRoutes = require("./routes/UserRoutes")
const CategoryRoutes = require("./routes/CategoryRoutes")
const SubCategoryRoutes = require("./routes/SubCategoryRoutes")
const ProductRoutes = require("./routes/ProductRoutes")
const ProductImageRoutes = require("./routes/ProductImageRoutes")

// routes
app.use("/users", UserRoutes)
app.use("/categories", CategoryRoutes)
app.use("/subcategories", SubCategoryRoutes)
app.use("/products", ProductRoutes)
app.use("/productimages", ProductImageRoutes)

app.listen(process.env.PORT || serverConf.port)
