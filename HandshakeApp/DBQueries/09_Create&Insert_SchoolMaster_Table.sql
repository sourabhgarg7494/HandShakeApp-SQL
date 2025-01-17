create table schoolmaster(
	id bigint auto_increment not null primary key
    ,name varchar(500) character set utf8mb4 not null
    ,stateid int
    ,cityid int
    ,countryid int 
    ,address varchar(500) character set utf8mb4
    ,orderid int
);

alter table schoolmaster
add constraint fk_statemaster_schoolmaster
foreign key (stateid)
references statemaster(id);

alter table schoolmaster
add constraint fk_citymaster_schoolmaster
foreign key (cityid)
references citymaster(id);

alter table schoolmaster
add constraint fk_countrymaster_schoolmaster
foreign key (countryid)
references countrymaster(id);

insert into schoolmaster (name,stateid,cityid,countryid,address,orderid) values ('san jose state university'
							,(select id from statemaster where name = 'california')
                            ,(select id from citymaster where name = 'san jose')
                            ,(select id from countrymaster where name = 'usa')
                            ,'1 washington sq, 95192'
                            ,1
                            );    

insert into schoolmaster (name,stateid,cityid,countryid,address,orderid) values ('san jose city college'
							,(select id from statemaster where name = 'california')
                            ,(select id from citymaster where name = 'san jose')
                            ,(select id from countrymaster where name = 'usa')
                            ,'2100 moorpark ave,95128'
                            ,2
                            );  						
