Create TABLE SchoolMaster(
	Id BIGINT auto_increment NOT NULL PRIMARY KEY
    ,Name VARCHAR(500) character set utf8mb4 NOT NULL
    ,StateId INT
    ,CityId INT
    ,CountryId INT 
    ,Address varchar(500) character set utf8mb4
    ,OrderId int
);

ALTER TABLE SchoolMaster
Add CONSTRAINT FK_StateMaster_SchoolMaster
FOREIGN KEY (StateId)
REFERENCES StateMaster(Id);

ALTER TABLE SchoolMaster
Add CONSTRAINT FK_CityMaster_SchoolMaster
FOREIGN KEY (CityId)
REFERENCES CityMaster(Id);

ALTER TABLE SchoolMaster
Add CONSTRAINT FK_CountryMaster_SchoolMaster
FOREIGN KEY (CountryId)
REFERENCES countrymaster(Id);

INSERT INTO schoolmaster (Name,StateId,CityId,CountryId,Address,OrderId) VALUES ('San Jose State University'
							,(SELECT Id FROM StateMaster where NAME = 'California')
                            ,(SELECT Id FROM CityMaster WHERE NAME = 'San Jose')
                            ,(SELECT Id FROM countrymaster WHERE Name = 'USA')
                            ,'1 Washington Sq, 95192'
                            ,1
                            );    

INSERT INTO schoolmaster (Name,StateId,CityId,CountryId,Address,OrderId) VALUES ('San Jose City College'
							,(SELECT Id FROM StateMaster where NAME = 'California')
                            ,(SELECT Id FROM CityMaster WHERE NAME = 'San Jose')
                            ,(SELECT Id FROM countrymaster WHERE Name = 'USA')
                            ,'2100 Moorpark Ave,95128'
                            ,2
                            );  						