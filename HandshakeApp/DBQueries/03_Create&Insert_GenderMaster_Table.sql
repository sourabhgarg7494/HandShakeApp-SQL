create table gendermaster(
	id int auto_increment not null primary key
    , name varchar(50) character set utf8mb4 not null
);

insert into gendermaster (name) values ('male'),('female') ;
