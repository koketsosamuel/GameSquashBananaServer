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
	FOREIGN KEY(user) REFERENCES Users,
	FOREIGN KEY(product) REFERENCES Products

);