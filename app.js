const express = require("express")
const bp = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const serverConf = require("./config/server")
const cookieSession = require("cookie-session")
const dbConf = require("./config/database")

var time = new Date().getTime() + 1000 * 60 * 60 * 24 * 90
var date = new Date(time)

const app = express()

app.set('trust proxy', 1) // trust first proxy
 
app.use(cookieSession({
  
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 1000 * 60 * 60 * 24 * 90,
    expires: date,
    sameSite: "Strict",
  
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
const CartItemRoutes = require("./routes/CartItemRoutes")
const ProductReviewsRoutes = require("./routes/ProductReviewRoutes")
const CouponRoutes = require("./routes/CouponRoutes")
const BannerRoutes = require("./routes/BannerRoutes")
const AddressRoutes = require("./routes/AddressRoutes")
const OrderRoutes = require("./routes/OrderRoutes")
const ReportRoutes = require("./routes/ReportRoutes")

// routes
app.use("/users", UserRoutes)
app.use("/categories", CategoryRoutes)
app.use("/subcategories", SubCategoryRoutes)
app.use("/products", ProductRoutes)
app.use("/productimages", ProductImageRoutes)
app.use("/randomusers", RandomUserRoutes)
app.use("/cartitems", CartItemRoutes)
app.use("/productreviews", ProductReviewsRoutes)
app.use("/coupons", CouponRoutes)
app.use("/banners", BannerRoutes)
app.use("/addresses", AddressRoutes)
app.use("/orders", OrderRoutes)
app.use("/reports", ReportRoutes)

app.listen(process.env.PORT || serverConf.port)