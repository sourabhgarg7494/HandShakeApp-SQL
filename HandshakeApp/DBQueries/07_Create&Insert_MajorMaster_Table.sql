Create table MajorMaster (
	Id int auto_increment NOT NULL PRIMARY KEY
    ,Name varchar(200) character set utf8mb4 NOT NULL
    ,OrderId int
);

INSERT INTO majormaster (Name,OrderId) VALUES ('Computer Engineering',1);
INSERT INTO majormaster (Name,OrderId) VALUES ('Chemical Engineering',2);
INSERT INTO majormaster (Name,OrderId) VALUES ('Electric Engineering',3);
INSERT INTO majormaster (Name,OrderId) VALUES ('Industrial Engineering',4);
INSERT INTO majormaster (Name,OrderId) VALUES ('Software Engineering',5);