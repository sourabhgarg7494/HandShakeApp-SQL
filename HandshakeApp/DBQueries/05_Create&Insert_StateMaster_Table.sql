CREATE TABLE statemaster(
	Id INT auto_increment NOT NULL PRIMARY KEY
    , Name varchar(100) character set utf8mb4 NOT NULL
    , CountryId int
    , OrderId int
);

ALTER TABLE statemaster
Add CONSTRAINT FK_statemaster_CountryMaster
FOREIGN KEY (CountryId)
REFERENCES countrymaster(Id);

INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Alabama',(SELECT Id FROM CountryMaster where Name = 'USA'),1);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Alaska',(SELECT Id FROM CountryMaster where Name = 'USA'),2);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Arizona',(SELECT Id FROM CountryMaster where Name = 'USA'),3);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Arkansas',(SELECT Id FROM CountryMaster where Name = 'USA'),4);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('California',(SELECT Id FROM CountryMaster where Name = 'USA'),5);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Colorado',(SELECT Id FROM CountryMaster where Name = 'USA'),6);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Connecticut',(SELECT Id FROM CountryMaster where Name = 'USA'),7);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Delaware',(SELECT Id FROM CountryMaster where Name = 'USA'),8);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Florida',(SELECT Id FROM CountryMaster where Name = 'USA'),9);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Georgia',(SELECT Id FROM CountryMaster where Name = 'USA'),10);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Hawaii',(SELECT Id FROM CountryMaster where Name = 'USA'),11);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Idaho',(SELECT Id FROM CountryMaster where Name = 'USA'),12);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Illinois',(SELECT Id FROM CountryMaster where Name = 'USA'),13);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Indiana',(SELECT Id FROM CountryMaster where Name = 'USA'),14);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Iowa',(SELECT Id FROM CountryMaster where Name = 'USA'),15);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Kansas',(SELECT Id FROM CountryMaster where Name = 'USA'),16);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Kentucky',(SELECT Id FROM CountryMaster where Name = 'USA'),17);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Louisiana',(SELECT Id FROM CountryMaster where Name = 'USA'),18);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Maine',(SELECT Id FROM CountryMaster where Name = 'USA'),19);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Maryland',(SELECT Id FROM CountryMaster where Name = 'USA'),20);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Massachusetts',(SELECT Id FROM CountryMaster where Name = 'USA'),21);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Michigan',(SELECT Id FROM CountryMaster where Name = 'USA'),22);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Minnesota',(SELECT Id FROM CountryMaster where Name = 'USA'),23);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Mississippi',(SELECT Id FROM CountryMaster where Name = 'USA'),24);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Missouri',(SELECT Id FROM CountryMaster where Name = 'USA'),25);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Montana',(SELECT Id FROM CountryMaster where Name = 'USA'),26);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Nebraska',(SELECT Id FROM CountryMaster where Name = 'USA'),27);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Nevada',(SELECT Id FROM CountryMaster where Name = 'USA'),28);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('New Hampshire',(SELECT Id FROM CountryMaster where Name = 'USA'),29);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('New Jersey',(SELECT Id FROM CountryMaster where Name = 'USA'),30);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('New Mexico',(SELECT Id FROM CountryMaster where Name = 'USA'),31);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('New York',(SELECT Id FROM CountryMaster where Name = 'USA'),32);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('North Carolina',(SELECT Id FROM CountryMaster where Name = 'USA'),33);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('North Dakota',(SELECT Id FROM CountryMaster where Name = 'USA'),34);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Ohio',(SELECT Id FROM CountryMaster where Name = 'USA'),35);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Oklahoma',(SELECT Id FROM CountryMaster where Name = 'USA'),36);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Oregon',(SELECT Id FROM CountryMaster where Name = 'USA'),37);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Pennsylvania',(SELECT Id FROM CountryMaster where Name = 'USA'),38);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Rhode Island',(SELECT Id FROM CountryMaster where Name = 'USA'),39);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('South Carolina',(SELECT Id FROM CountryMaster where Name = 'USA'),40);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('South Dakota',(SELECT Id FROM CountryMaster where Name = 'USA'),41);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Tennessee',(SELECT Id FROM CountryMaster where Name = 'USA'),42);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Texas',(SELECT Id FROM CountryMaster where Name = 'USA'),43);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Utah',(SELECT Id FROM CountryMaster where Name = 'USA'),44);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Vermont',(SELECT Id FROM CountryMaster where Name = 'USA'),45);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Virginia',(SELECT Id FROM CountryMaster where Name = 'USA'),46);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Washington',(SELECT Id FROM CountryMaster where Name = 'USA'),47);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('West Virginia',(SELECT Id FROM CountryMaster where Name = 'USA'),48);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Wisconsin',(SELECT Id FROM CountryMaster where Name = 'USA'),49);
INSERT INTO StateMaster (Name,CountryId,OrderId) VALUES ('Wyoming',(SELECT Id FROM CountryMaster where Name = 'USA'),50);