create table usersession(
	id int auto_increment not null primary key
    ,email varchar(500) character set utf8mb4 not null
    ,token varchar(4000) character set utf8mb4 not null
);

