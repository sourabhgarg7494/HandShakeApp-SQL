create table companydetails(
	id int auto_increment not null primary key
    ,companyid bigint
    ,companyname varchar(300) character set utf8mb4 not null
    ,address varchar(500) character set utf8mb4
    ,countryid int
    ,stateid int
    ,cityid int
    ,description varchar(1000) character set utf8mb4
    ,phone varchar(20) character set utf8mb4
    ,profilepicturepath varchar(1000) character set utf8mb4
);

alter table companydetails
add constraint fk_companydetails_users
foreign key (companyid)
references users(id);

alter table companydetails
add constraint fk_companydetails_countrymaster
foreign key (countryid)
references countrymaster(id);

alter table companydetails
add constraint fk_companydetails_statemaster
foreign key (stateid)
references statemaster(id);

alter table companydetails
add constraint fk_companydetails_citymaster
foreign key (cityid)
references citymaster(id);
