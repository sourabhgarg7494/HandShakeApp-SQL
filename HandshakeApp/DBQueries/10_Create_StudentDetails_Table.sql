create table studentdetails(
	id int auto_increment not null primary key
    ,studentid bigint
    ,firstname varchar(100) character set utf8mb4 not null
    ,lastname varchar(100) character set utf8mb4 not null
    ,profilepicturepath varchar(1000) character set utf8mb4
    ,dateofbirth date
    ,cityid int
    ,stateid int
    ,countryid int
    ,address varchar(500) character set utf8mb4
    ,carrerobjective varchar(1000) character set utf8mb4
    ,genderid int
    ,phonenumber varchar(20) character set utf8mb4
);

alter table studentdetails
add constraint fk_studentdetails_users
foreign key (studentid)
references users(id);

alter table studentdetails
add constraint fk_studentdetails_citymaster
foreign key (cityid)
references citymaster(id);

alter table studentdetails
add constraint fk_studentdetails_statemaster
foreign key (stateid)
references statemaster(id);

alter table studentdetails
add constraint fk_studentdetails_countrymaster
foreign key (countryid)
references countrymaster(id);

alter table studentdetails
add constraint fk_studentdetails_gendermaster
foreign key (genderid)
references gendermaster(id);

