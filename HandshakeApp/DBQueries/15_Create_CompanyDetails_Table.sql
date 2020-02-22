Create Table CompanyDetails(
	Id int auto_increment Not NULL Primary Key
    ,CompanyId bigint
    ,CompanyName varchar(300) character set utf8mb4 not NULL
    ,Address varchar(500) character set utf8mb4
    ,CountryId int
    ,StateId int
    ,CityId int
    ,Description varchar(1000) character set utf8mb4
    ,Phone varchar(20) character set utf8mb4
    ,ProfilePicturePath varchar(1000) character set utf8mb4
);

ALTER TABLE CompanyDetails
Add CONSTRAINT FK_CompanyDetails_Users
Foreign Key (CompanyId)
references Users(Id);

ALTER TABLE CompanyDetails
Add CONSTRAINT FK_CompanyDetails_CountryMaster
Foreign Key (CountryId)
references countrymaster(Id);

ALTER TABLE CompanyDetails
Add CONSTRAINT FK_CompanyDetails_StateMaster
Foreign Key (StateId)
references statemaster(Id);

ALTER TABLE CompanyDetails
Add CONSTRAINT FK_CompanyDetails_CityMaster
Foreign Key (CityId)
references citymaster(Id);