create table countrymaster(
	id int auto_increment not null primary key
    , name varchar(100) character set utf8mb4 not null
    , orderid int
);

insert into countrymaster (name,orderid) values ('usa',1)
