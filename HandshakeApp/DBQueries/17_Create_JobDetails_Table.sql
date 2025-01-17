
create table jobdetails(
	id int auto_increment not null primary key
    ,jobtitle varchar(100) character set utf8mb4 not null
    ,postingdate date
    ,applicationdeadlinedate date
    ,countryid int 
    ,stateid int
    ,cityid int
    ,address varchar(500) character set utf8mb4
    ,salary decimal(13,2)
    ,jobdescription varchar(4000) character set utf8mb4
    ,companyid bigint
);

alter table jobdetails
add constraint fk_countrymaster_jobdetails
foreign key (countryid)
references countrymaster(id);

alter table jobdetails
add constraint fk_statemaster_jobdetails
foreign key (stateid)
references statemaster(id);

alter table jobdetails
add constraint fk_citymaster_jobdetails
foreign key (cityid)
references citymaster(id);


alter table jobdetails
add constraint fk_users_jobdetails
foreign key (companyid)
references users(id);
