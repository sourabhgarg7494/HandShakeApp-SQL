CREATE TABLE EventMaster(
	Id INT auto_increment not NULL Primary Key
    ,EventName varchar(250) character set utf8mb4 not NULL 
    ,Description varchar(2000) character set utf8mb4
    ,DateAndTime DateTime
    ,CountryId Int
    ,StateId Int
    ,CityId Int
    ,Address varchar(500) character set utf8mb4
    ,CompanyId bigint
);

ALTER TABLE EventMAster
Add CONSTRAINT FK_EventMaster_CountryMaster
FOREIGN KEY (CountryId)
REFERENCES CountryMaster(Id);


ALTER TABLE EventMAster
Add CONSTRAINT FK_EventMaster_StateMaster
FOREIGN KEY (StateId)
REFERENCES statemaster(Id);


ALTER TABLE EventMAster
Add CONSTRAINT FK_EventMaster_CityMaster
FOREIGN KEY (CityId)
REFERENCES citymaster(Id);


ALTER TABLE EventMAster
Add CONSTRAINT FK_EventMaster_Users
FOREIGN KEY (CompanyId)
REFERENCES Users(Id);