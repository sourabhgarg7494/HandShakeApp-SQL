create table jobcategorymaster(
	id int auto_increment not null primary key
    ,name varchar(200) character set utf8mb4 not null
    ,orderid int
);

insert into jobcategorymaster (name,orderid) values ('full time',1);
insert into jobcategorymaster (name,orderid) values ('part time',2);
insert into jobcategorymaster (name,orderid) values ('internship',3);
insert into jobcategorymaster (name,orderid) values ('on campus',4);
