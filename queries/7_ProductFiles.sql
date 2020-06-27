CREATE TABLE ProductFiles (

	id INT NOT NULL,
	product INT NOT NULL,
	file TEXT NOT NULL,
	fileDescription TEXT NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(product) REFERENCES Products

);