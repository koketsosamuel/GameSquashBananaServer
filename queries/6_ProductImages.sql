CREATE TABLE ProductImages (

	id INT NOT NULL AUTO_INCREMENT,
	image TEXT NOT NULL,
	product INT NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(product) REFERENCES Products

);