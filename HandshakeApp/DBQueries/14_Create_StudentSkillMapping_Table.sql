create table studentskillmapping(
	id int auto_increment not null primary key
    , studentid bigint 
    , skillid int
);

alter table studentskillmapping
add constraint fk_studentskillmapping_skillmaster
foreign key (skillid)
references skillmaster(id);


alter table studentskillmapping
add constraint fk_studentskillmapping_users
foreign key (studentid)
references users(id);
