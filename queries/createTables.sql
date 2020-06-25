CREATE TABLE Users (

	username TEXT NOT NULL UNIQUE, -- PK
	password TINYTEXT NOT NULL,
	email TINYTEXT NOT NULL UNIQUE,
	name TINYTEXT NOT NULL,
	phone TINYTEXT NOT NULL,
	isAdmin TINYTEXT NOT NULL,
	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(username)

)

CREATE TABLE CartItem (

	id INT NOT NULL AUTO_INCREMENT,
	quantity INT NOT NULL,
	product INT NOT NULL,
	user TEXT NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(user) REFERENCES Users,
	FOREIGN KEY(product) REFERENCES Products

)

CREATE TABLE Orders (

	id INT NOT NULL AUTO_INCREMENT,  -- PK
	user TEXT NOT NULL, -- FK1
	address INT NOT NULL, -- FK2
	coupon INT, -- FK3
	amount DOUBLE NOT NULL,
	status INT NOT NULL, -- FK4
	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(user) REFERENCES Users,
	FOREIGN KEY(address) REFERENCES Address,
	FOREIGN KEY(coupon) REFERENCES Coupons,
	FOREIGN KEY(status) REFERENCES OrderStatuses

)

CREATE TABLE OrderItem (

	id INT NOT NULL AUTO_INCREMENT,
	order INT NOT NULL,
	product INT NOT NULL,
	amount DECIMAL NOT NULL,
	quantity INT NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(order) REFERENCES Orders,
	FOREIGN KEY(product) REFERENCES Products

)

CREATE TABLE Products (

	id INT NOT NULL AUTO_INCREMENT,
	category INT NOT NULL,
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	price DOUBLE NOT NULL,
	tags TEXT,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(category) REFERENCES Categories

)

CREATE TABLE ProductReviews (

	id INT NOT NULL AUTO_INCREMENT,
	product INT NOT NULL,
	user TEXT NOT NULL,
	rating INT NOT NULL,
	comment INT NOT NULL,
	show CHAR NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(user)

)

CREATE TABLE ProductImages (

	id INT NOT NULL AUTO_INCREMENT,
	image TEXT NOT NULL,
	product INT NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(product) REFERENCES Products

)

CREATE TABLE ProductFiles (

	id INT NOT NULL,
	product INT NOT NULL,
	file TEXT NOT NULL,
	fileDescription TEXT NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(product)

)

CREATE TABLE Categories(

	id INT NOT NULL AUTO_INCREMENT,
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	banner TEXT,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id)

)

CREATE TABLE OrderStatuses (

	id INT NOT NULL AUTO_INCREMENT,
	name TINYTEXT NOT NULL,
	description TEXT NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id)

)

CREATE TABLE Coupons (

	id INT AUTO_INCREMENT,
	isPercentage CHAR NOT NULL,
	percentage DECIMAL,
	minOrderAmount DOUBLE NOT NULL,
	maxOrderAmount BOUBLE NOT NULL,
	maxDiscountAmount DOUBLE NOT NULL,
	discountAmount DECIMAL NOT NULL,
	forSpecificCategory CHAR NOT NULL,
	noUses INT,
	expires DATE,
	active CHAR NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id)

)

CREATE TABLE Address  (

	id MEDUIUMINT NOT NULL AUTO_INCREMENT,
	user TEXT NOT NULL, -- FK1
	recipientName TEXT NOT NULL,
	recipientPhone TEXT NOT NULL,
	additionalInfo TEXT,
	address TEXT NOT NULL,
	coords TEXT,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(user) REFERENCES Users

)

CREATE TABLE Payments(

	id INT NOT NULL AUTO_INCREMENT,
	amount DOUBLE NOT NULL,
	card INT,
	method INT NOT NULL,
	payRef TEXT,
	order INT NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(card) REFERENCES Cards,
	FOREIGN KEY(method) REFERENCES PaymentMethods,
	FOREIGN KEY(order) REFERENCES Orders

)

CREATE TABLE PaymentMethods (

	id INT NOT NULL AUTO_INCREMENT,
	name TINYTEXT NOT NULL,
	description TEXT NOT NULL,
	maxAmount DOUBLE NOT NULL,
	minAmount DOUBLE NOT NULL,
	withinRadius DOUBLE NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id)

)

CREATE TABLE Cards(

	id INT NOT NULL AUTO_INCREMENT,
	user TEXT NOT NULL,

	cardType TEXT NOT NULL,
	cardCVV TINYTEXT NOT NULL,
	cardNumber TINYTEXT NOT NULL,
	cardExp TINYTEXT NOT NULL,

	PRIMARY KEY(id),
	FOREIGN KEY(user) REFERENCES Users

)

CREATE TABLE Warehouses(

	id INT NOT NULL AUTO_INCREMENT,
	name TEXT NOT NULL,
	coords TEXT NOT NULL,

	PRIMARY KEY(id)

)