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

);