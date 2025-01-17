
create table jobcategorymapping(
	id bigint auto_increment not null primary key
    ,jobid int
    ,jobcategoryid int
);

alter table jobcategorymapping
add constraint fk_jobdetails_jobcategorymapping
foreign key (jobid)
references jobdetails(id);


alter table jobcategorymapping
add constraint fk_jobcategorymaster_jobcategorymapping
foreign key (jobcategoryid)
references jobcategorymaster(id);
