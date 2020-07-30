const express = require("express")
const bp = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const serverConf = require("./config/server")
const cookieSession = require("cookie-session")
const authConf = require("./config/auth")
const dbConf = require("./config/database")

const app = express()

app.set('trust proxy', 1) // trust first proxy
 
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 100,
      sameSite: "strict"
  }
}))

app.use(bp.json())

app.use(cors({ credentials: true, origin: "http://localhost:8080" }))
//app.use(cors())
mongoose.connect(dbConf.connStr, dbConf.options)

app.use("/upload", express.static("./upload"))

const UserRoutes = require("./routes/UserRoutes")
const CategoryRoutes = require("./routes/CategoryRoutes")
const SubCategoryRoutes = require("./routes/SubCategoryRoutes")
const ProductRoutes = require("./routes/ProductRoutes")
const ProductImageRoutes = require("./routes/ProductImageRoutes")
const RandomUserRoutes = require("./routes/RandomUserRoutes")
const CartItemRoutes = require("./routes/cartItemRoutes")

// routes
app.use("/users", UserRoutes)
app.use("/categories", CategoryRoutes)
app.use("/subcategories", SubCategoryRoutes)
app.use("/products", ProductRoutes)
app.use("/productimages", ProductImageRoutes)
app.use("/randomusers", RandomUserRoutes)
app.use("/cartitems", CartItemRoutes)

app.listen(process.env.PORT || serverConf.port)
