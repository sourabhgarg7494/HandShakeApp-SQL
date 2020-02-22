Create TABLE ApplicationStatusMaster(
	Id INT auto_increment Not NULL Primary Key
    ,Name varchar(20) character set utf8mb4
);

insert INTO ApplicationStatusMaster (Name) values ("Pending");
insert INTO ApplicationStatusMaster (Name) values ("Reviewed");
insert INTO ApplicationStatusMaster (Name) values ("Declined");