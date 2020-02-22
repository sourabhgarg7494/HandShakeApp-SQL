
CREATE Table JobDetails(
	Id int auto_increment Not NULL Primary Key
    ,JobTitle varchar(100) character set utf8mb4 NOT NULL
    ,PostingDate date
    ,ApplicationDeadLineDate date
    ,CountryId int 
    ,StateId int
    ,CityId int
    ,Address varchar(500) character set utf8mb4
    ,Salary Decimal(13,2)
    ,JobDescription varchar(4000) character set utf8mb4
    ,CompanyId bigint
);

Alter TABLE JobDetails
Add Constraint FK_CountryMaster_JobDetails
FOREIGN key (CountryId)
REFERENCES countrymaster(Id);

Alter TABLE JobDetails
Add Constraint FK_StateMaster_JobDetails
FOREIGN key (StateId)
REFERENCES StateMaster(Id);

Alter TABLE JobDetails
Add Constraint FK_CityMaster_JobDetails
FOREIGN key (CityId)
REFERENCES CityMaster(Id);


Alter TABLE JobDetails
Add Constraint FK_Users_JobDetails
FOREIGN key (CompanyId)
REFERENCES Users(Id);