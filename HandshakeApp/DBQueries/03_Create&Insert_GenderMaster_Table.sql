CREATE TABLE gendermaster(
	Id INT auto_increment NOT NULL PRIMARY KEY
    , Name VARCHAR(50) character set utf8mb4 NOT NULL
);

INSERT INTO gendermaster (Name) VALUES ('Male'),('Female') ;