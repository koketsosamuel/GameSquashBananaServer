const fs = require("fs")
const dbConf = require("./config/database")
const authConf = require("./config/auth")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

mongoose.connect(dbConf.connStr, dbConf.options)

const User = require("./models/User")
const Category = require("./models/Category")

let cats = [
	{
		name: "Action", 
		description: "Adrenaline"
	},
	{
		name: "Adventure",
		description: "discover new bananas"
	},
	{
		name: "Tower",
		description: "protect your terrirtory"
	},
	{
		name: "Sports",
		description: "Lewandowski is waiting for you"
	}
]

let users = [
	{
		name: "Chower",
		phone: "0712345678",
		isOrderManager: true,
		email: "giggles@gmail.com",
		pwd: "lilmajin"
	},
	{
		name: "Boitumelo",
		phone: "0723456789",
		isProductManager: true,
		email: "beetee@gmail.com",
		pwd: "vanhelsing"

	},
	{
		name: "Root",
		phone: "0734567851",
		email: "mehhh@gmail.com",
		pwd: "amthegoat",
		isAdmin: true,
		isSuper: true,
	}
]

for(let i = 0; i < cats.length; i++) {

	let cat = new Category({...cats[i]})
	cat.save()

}

for(let i = 0; i < users.length; i++ ) {

	
	bcrypt.hash(users[i].pwd, authConf.saltRounds, (err, hash) => {
			
		users[i].pwd = hash
		
		let newUser = new User(users[i])
		// we save the user and respond to the client
		newUser.save((err) => {
			if (err) return console.log(err)
			console.log(users[i].name + " added!")
		})
	})


}

try {
	
fs.mkdirSync("./upload")
fs.mkdirSync("./upload/img")
fs.mkdirSync("./upload/banner")
fs.mkdirSync("./upload/thumbs")
fs.mkdirSync("./upload/tmpImg")
} catch(err) {
	
}