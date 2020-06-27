INSERT INTO Users (username, pwd, email, name, phone, isAdmin, createdAt) 
VALUES ("root", "root", "root@example.com", "John Root", "0793337737", "y", SELECT CURDATE());

INSERT INTO OrderStatuses (name, description, default, createdAt)
VALUES  ("Ordered", "Order has been made", "Y", SELECT CURDATE());