create table userroles(
	id int auto_increment primary key
    ,name varchar(50) character set utf8mb4 not null
);

insert into userroles (name) values('student'),('company');
