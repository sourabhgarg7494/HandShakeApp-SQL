Create TABLE UserSession(
	Id INT Auto_increment NOT NULL PRIMARY KEY
    ,Email VARCHAR(500) character set utf8mb4 NOT NULL
    ,Token VARCHAR(4000) character set utf8mb4 NOT NULL
);

