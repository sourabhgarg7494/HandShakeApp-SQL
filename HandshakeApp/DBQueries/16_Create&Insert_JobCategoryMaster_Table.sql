Create Table JobCategoryMaster(
	Id int auto_increment not null primary key
    ,Name varchar(200) character set utf8mb4 not null
    ,OrderId int
);

INSERT INTO JobCategoryMaster (Name,OrderId) VALUES ('Full Time',1);
INSERT INTO JobCategoryMaster (Name,OrderId) VALUES ('Part Time',2);
INSERT INTO JobCategoryMaster (Name,OrderId) VALUES ('Internship',3);
INSERT INTO JobCategoryMaster (Name,OrderId) VALUES ('On Campus',4);