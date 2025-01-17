create table eventmaster(
	id int auto_increment not null primary key
    ,eventname varchar(250) character set utf8mb4 not null 
    ,description varchar(2000) character set utf8mb4
    ,dateandtime datetime
    ,countryid int
    ,stateid int
    ,cityid int
    ,address varchar(500) character set utf8mb4
    ,companyid bigint
);

alter table eventmaster
add constraint fk_eventmaster_countrymaster
foreign key (countryid)
references countrymaster(id);


alter table eventmaster
add constraint fk_eventmaster_statemaster
foreign key (stateid)
references statemaster(id);


alter table eventmaster
add constraint fk_eventmaster_citymaster
foreign key (cityid)
references citymaster(id);


alter table eventmaster
add constraint fk_eventmaster_users
foreign key (companyid)
references users(id);
