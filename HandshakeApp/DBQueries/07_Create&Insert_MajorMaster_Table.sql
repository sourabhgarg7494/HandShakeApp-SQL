create table majormaster (
	id int auto_increment not null primary key
    ,name varchar(200) character set utf8mb4 not null
    ,orderid int
);

insert into majormaster (name,orderid) values ('computer engineering',1);
insert into majormaster (name,orderid) values ('chemical engineering',2);
insert into majormaster (name,orderid) values ('electric engineering',3);
insert into majormaster (name,orderid) values ('industrial engineering',4);
insert into majormaster (name,orderid) values ('software engineering',5);
