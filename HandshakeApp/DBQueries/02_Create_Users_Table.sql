Create Table Users(
	Id BIGINT AUTO_INCREMENT PRIMARY KEY
    ,EmailId VARCHAR(500) character set utf8mb4 NOT NULL UNIQUE
    ,Password VARCHAR(4000) character set utf8mb4 NOT NULL
    ,PasswordSalt VARCHAR(4000) character set utf8mb4 NOT NULL
    ,RoleId INT
);

ALTER TABLE Users
Add CONSTRAINT FK_Users_Userroles
FOREIGN KEY (RoleId)
REFERENCES userroles(Id);