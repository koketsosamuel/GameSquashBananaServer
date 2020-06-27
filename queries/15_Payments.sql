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

);