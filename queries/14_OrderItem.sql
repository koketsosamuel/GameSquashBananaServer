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

);