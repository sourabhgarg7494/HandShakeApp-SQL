Create TABLE StudentDetails(
	Id INT Auto_increment NOT NULL PRIMARY KEY
    ,StudentId BIGINT
    ,FirstName VARCHAR(100) character set utf8mb4 NOT NULL
    ,LastName VARCHAR(100) character set utf8mb4 NOT NULL
    ,ProfilePicturePath VARCHAR(1000) character set utf8mb4
    ,DateOfBirth DATE
    ,CityId INT
    ,StateId INT
    ,CountryId INT
    ,Address VARCHAR(500) character set utf8mb4
    ,CarrerObjective VARCHAR(1000) character set utf8mb4
    ,GenderId INT
    ,PhoneNumber VARCHAR(20) character set utf8mb4
);

ALTER TABLE StudentDetails
Add CONSTRAINT FK_StudentDetails_Users
FOREIGN KEY (StudentId)
REFERENCES Users(Id);

ALTER TABLE StudentDetails
Add CONSTRAINT FK_StudentDetails_CityMaster
FOREIGN KEY (CityId)
REFERENCES CityMaster(Id);

ALTER TABLE StudentDetails
Add CONSTRAINT FK_StudentDetails_StateMaster
FOREIGN KEY (StateId)
REFERENCES StateMaster(Id);

ALTER TABLE StudentDetails
Add CONSTRAINT FK_StudentDetails_CountryMaster
FOREIGN KEY (CountryId)
REFERENCES countrymaster(Id);

ALTER TABLE StudentDetails
Add CONSTRAINT FK_StudentDetails_GenderMaster
FOREIGN KEY (GenderId)
REFERENCES gendermaster(Id);

