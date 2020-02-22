CREATE TABLE Userroles(
	Id INT auto_increment PRIMARY KEY
    ,Name VARCHAR(50) character set utf8mb4 NOT NULL
);

INSERT INTO Userroles (Name) values('Student'),('Company');