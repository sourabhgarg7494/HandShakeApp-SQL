
create table jobapplications(
	id bigint auto_increment not null primary key
    ,jobid int
    ,studentid bigint
    ,studentresumeid int
    ,applicationstatusid int default 1
    ,applicationdate date
);

alter table jobapplications
add constraint fk_jobdetails_jobapplication
foreign key (jobid)
references jobdetails(id);

alter table jobapplications
add constraint fk_users_jobapplication
foreign key (studentid)
references users(id);

alter table jobapplications
add constraint fk_studentresume_jobapplication
foreign key (studentresumeid)
references studentresume(id);

alter table jobapplications
add constraint fk_applicationstatusmaster_jobapplication
foreign key (applicationstatusid)
references applicationstatusmaster(id);
