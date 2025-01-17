create table studentexperiencemapping(
	id int auto_increment not null primary key
    ,studentid bigint
    ,companyname varchar(200) character set utf8mb4 not null
    ,title varchar(200) character set utf8mb4 not null
    ,address varchar(500) character set utf8mb4
    ,stateid int
    ,cityid int
    ,countryid int
    ,startdate date
    ,enddate date
    ,workdescription varchar(1000) character set utf8mb4
);

alter table studentexperiencemapping
add constraint fk_studentexperiencemapping_users
foreign key (studentid)
references users(id);

alter table studentexperiencemapping
add constraint fk_studentexperiencemapping_statemaster
foreign key (stateid)
references statemaster(id);

alter table studentexperiencemapping
add constraint fk_studentexperiencemapping_citymaster
foreign key (cityid)
references citymaster(id);

alter table studentexperiencemapping
add constraint fk_studentexperiencemapping_countrymaster
foreign key (countryid)
references countrymaster(id);
