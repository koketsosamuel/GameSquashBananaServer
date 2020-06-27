CREATE TABLE Orders (

	id INT NOT NULL AUTO_INCREMENT,  -- PK
	user TEXT NOT NULL, -- FK1
	address INT NOT NULL, -- FK2
	coupon INT, -- FK3
	amount DOUBLE NOT NULL,
	status INT NOT NULL, -- FK4
	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id),
	FOREIGN KEY(user) REFERENCES Users,
	FOREIGN KEY(address) REFERENCES Address,
	FOREIGN KEY(coupon) REFERENCES Coupons,
	FOREIGN KEY(status) REFERENCES OrderStatuses

);