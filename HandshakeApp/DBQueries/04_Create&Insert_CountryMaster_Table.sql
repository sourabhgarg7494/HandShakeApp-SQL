CREATE TABLE CountryMaster(
	Id INT auto_Increment NOT NULL PRIMARY KEY
    , Name VARCHAR(100) character set utf8mb4 NOT NULL
    , OrderId INT
);

INSERT INTO CountryMaster (Name,OrderId) VALUES ('USA',1)