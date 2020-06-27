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

);