create table eventstudentmapping(
	id int auto_increment not null primary key
    , eventid int
    , studentid bigint
);

alter table eventstudentmapping
add constraint fk_eventmaster_eventstudentmapping
foreign key (eventid)
references eventmaster(id);


alter table eventstudentmapping
add constraint fk_users_eventstudentmapping
foreign key (studentid)
references users(id);
