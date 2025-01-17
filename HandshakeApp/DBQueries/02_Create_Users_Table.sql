create table users(
	id bigint auto_increment primary key
    ,emailid varchar(500) character set utf8mb4 not null unique
    ,password varchar(4000) character set utf8mb4 not null
    ,passwordsalt varchar(4000) character set utf8mb4 not null
    ,roleid int
);

alter table users
add constraint fk_users_userroles
foreign key (roleid)
references userroles(id);
