Create table SkillMaster(
	Id INT auto_increment NOT NULL PRIMARY KEY
    , Name varchar(400) character set utf8mb4 NOT NULL
    , OrderId int
);

Insert INTO skillmaster (Name,OrderId) VALUES ('.Net',1);
Insert INTO skillmaster (Name,OrderId) VALUES ('JAVA',2);
Insert INTO skillmaster (Name,OrderId) VALUES ('JavaScript',3);
Insert INTO skillmaster (Name,OrderId) VALUES ('JQuery',4);
Insert INTO skillmaster (Name,OrderId) VALUES ('React',5);
Insert INTO skillmaster (Name,OrderId) VALUES ('Node.js',6);
Insert INTO skillmaster (Name,OrderId) VALUES ('AngularJS',7);