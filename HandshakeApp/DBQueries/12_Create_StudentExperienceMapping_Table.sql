Create table StudentExperienceMapping(
	Id int auto_increment not null primary key
    ,StudentId bigint
    ,CompanyName varchar(200) character set utf8mb4 Not NULL
    ,Title varchar(200) character set utf8mb4 not null
    ,Address varchar(500) character set utf8mb4
    ,StateId int
    ,CityId int
    ,CountryId int
    ,StartDate DATE
    ,EndDate DATE
    ,WorkDescription varchar(1000) character set utf8mb4
);

alter table studentExperienceMapping
add constraint FK_studentExperienceMapping_Users
Foreign Key (StudentId)
references users(Id);

alter table studentExperienceMapping
add constraint FK_studentExperienceMapping_StateMaster
Foreign Key (StateId)
references StateMaster(Id);

alter table studentExperienceMapping
add constraint FK_studentExperienceMapping_CityMaster
Foreign Key (CityID)
references CityMaster(Id);

alter table studentExperienceMapping
add constraint FK_studentExperienceMapping_CountryMaster
Foreign Key (CountryId)
references countrymaster(Id);