create table applicationstatusmaster(
	id int auto_increment not null primary key
    ,name varchar(20) character set utf8mb4
);

insert into applicationstatusmaster (name) values ("pending");
insert into applicationstatusmaster (name) values ("reviewed");
insert into applicationstatusmaster (name) values ("declined");
