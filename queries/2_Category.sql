CREATE TABLE Categories(

	id INT NOT NULL AUTO_INCREMENT,
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	banner TEXT,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id)

);