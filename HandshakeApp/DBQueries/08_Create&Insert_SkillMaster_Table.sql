create table skillmaster(
	id int auto_increment not null primary key
    , name varchar(400) character set utf8mb4 not null
    , orderid int
);

insert into skillmaster (name,orderid) values ('.net',1);
insert into skillmaster (name,orderid) values ('java',2);
insert into skillmaster (name,orderid) values ('javascript',3);
insert into skillmaster (name,orderid) values ('jquery',4);
insert into skillmaster (name,orderid) values ('react',5);
insert into skillmaster (name,orderid) values ('node.js',6);
insert into skillmaster (name,orderid) values ('angularjs',7);
