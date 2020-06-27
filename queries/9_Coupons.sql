CREATE TABLE Coupons (

	id INT AUTO_INCREMENT,
	isPercentage CHAR NOT NULL,
	percentage DECIMAL,
	minOrderAmount DOUBLE NOT NULL,
	maxOrderAmount DOUBLE NOT NULL,
	maxDiscountAmount DOUBLE NOT NULL,
	discountAmount DECIMAL NOT NULL,
	forSpecificCategory CHAR NOT NULL,
	noUses INT,
	expires DATE,
	active CHAR NOT NULL,

	createdAt DATE NOT NULL,
	updatedAt DATE,

	PRIMARY KEY(id)

);