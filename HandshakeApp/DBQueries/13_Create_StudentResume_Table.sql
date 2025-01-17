create table studentresume(
	id int auto_increment primary key
    ,studentid bigint
    ,resumepath varchar(500) character set utf8mb4 not null
    ,filename varchar(200) character set utf8mb4 not null
    ,dateuploaded date
);

alter table studentresume
add constraint fk_studentresume_users
foreign key (studentid)
references users(id);
