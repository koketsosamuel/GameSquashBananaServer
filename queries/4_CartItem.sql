CREATE TABLE CartItem (

	id INT AUTO_INCREMENT,
	quantity INT NOT NULL,
	product INT NOT NULL,
	user TEXT NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(user) REFERENCES Users,
	FOREIGN KEY(product) REFERENCES Products

);