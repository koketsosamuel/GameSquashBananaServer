CREATE TABLE OrderStatuses (

	id INT NOT NULL AUTO_INCREMENT,
	name TINYTEXT NOT NULL,
	description TEXT NOT NULL,
    default CHAR NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id)

);