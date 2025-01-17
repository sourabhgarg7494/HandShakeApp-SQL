create table studenteducationdetailsmapping(
	id int auto_increment not null primary key
    ,studentid bigint
    ,schoolid bigint
    ,startdate date
    ,enddate date
    ,majorid int
    ,departmentgpa double
    ,cumulativegpa double
);

alter table studenteducationdetailsmapping
add constraint fk_studenteducationdetailsmapping_users
foreign key (studentid)
references users(id);

alter table studenteducationdetailsmapping
add constraint fk_schoolmaster_users
foreign key (schoolid)
references schoolmaster(id);

alter table studenteducationdetailsmapping
add constraint fk_majormaster_users
foreign key (majorid)
references majormaster(id);
