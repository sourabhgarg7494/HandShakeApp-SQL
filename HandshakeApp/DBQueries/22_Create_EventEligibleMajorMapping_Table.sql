create table eventeligiblemajormapping(
	id int auto_increment not null primary key
    ,eventid int
    ,eligiblemajorid int
);

alter table eventeligiblemajormapping
add constraint fk_eventmaster_eventeligiblemajotmapping
foreign key (eventid)
references eventmaster(id);

alter table eventeligiblemajormapping
add constraint fk_majormster_eventeligiblemajotmapping
foreign key (eligiblemajorid)
references majormaster(id);
