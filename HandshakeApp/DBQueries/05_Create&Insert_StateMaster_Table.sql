create table statemaster(
	id int auto_increment not null primary key
    , name varchar(100) character set utf8mb4 not null
    , countryid int
    , orderid int
);

alter table statemaster
add constraint fk_statemaster_countrymaster
foreign key (countryid)
references countrymaster(id);

insert into statemaster (name,countryid,orderid) values ('alabama',(select id from countrymaster where name = 'usa'),1);
insert into statemaster (name,countryid,orderid) values ('alaska',(select id from countrymaster where name = 'usa'),2);
insert into statemaster (name,countryid,orderid) values ('arizona',(select id from countrymaster where name = 'usa'),3);
insert into statemaster (name,countryid,orderid) values ('arkansas',(select id from countrymaster where name = 'usa'),4);
insert into statemaster (name,countryid,orderid) values ('california',(select id from countrymaster where name = 'usa'),5);
insert into statemaster (name,countryid,orderid) values ('colorado',(select id from countrymaster where name = 'usa'),6);
insert into statemaster (name,countryid,orderid) values ('connecticut',(select id from countrymaster where name = 'usa'),7);
insert into statemaster (name,countryid,orderid) values ('delaware',(select id from countrymaster where name = 'usa'),8);
insert into statemaster(name,countryid,orderid) values ('florida',(select id from countrymaster where name = 'usa'),9);
insert into statemaster (name,countryid,orderid) values ('georgia',(select id from countrymaster where name = 'usa'),10);
insert into statemaster (name,countryid,orderid) values ('hawaii',(select id from countrymaster where name = 'usa'),11);
insert into statemaster (name,countryid,orderid) values ('idaho',(select id from countrymaster where name = 'usa'),12);
insert into statemaster (name,countryid,orderid) values ('illinois',(select id from countrymaster where name = 'usa'),13);
insert into statemaster (name,countryid,orderid) values ('indiana',(select id from countrymaster where name = 'usa'),14);
insert into statemaster (name,countryid,orderid) values ('iowa',(select id from countrymaster where name = 'usa'),15);
insert into statemaster (name,countryid,orderid) values ('kansas',(select id from countrymaster where name = 'usa'),16);
insert into statemaster (name,countryid,orderid) values ('kentucky',(select id from countrymaster where name = 'usa'),17);
insert into statemaster (name,countryid,orderid) values ('louisiana',(select id from countrymaster where name = 'usa'),18);
insert into statemaster (name,countryid,orderid) values ('maine',(select id from countrymaster where name = 'usa'),19);
insert into statemaster (name,countryid,orderid) values ('maryland',(select id from countrymaster where name = 'usa'),20);
insert into statemaster (name,countryid,orderid) values ('massachusetts',(select id from countrymaster where name = 'usa'),21);
insert into statemaster (name,countryid,orderid) values ('michigan',(select id from countrymaster where name = 'usa'),22);
insert into statemaster (name,countryid,orderid) values ('minnesota',(select id from countrymaster where name = 'usa'),23);
insert into statemaster (name,countryid,orderid) values ('mississippi',(select id from countrymaster where name = 'usa'),24);
insert into statemaster (name,countryid,orderid) values ('missouri',(select id from countrymaster where name = 'usa'),25);
insert into statemaster (name,countryid,orderid) values ('montana',(select id from countrymaster where name = 'usa'),26);
insert into statemaster (name,countryid,orderid) values ('nebraska',(select id from countrymaster where name = 'usa'),27);
insert into statemaster (name,countryid,orderid) values ('nevada',(select id from countrymaster where name = 'usa'),28);
insert into statemaster (name,countryid,orderid) values ('new hampshire',(select id from countrymaster where name = 'usa'),29);
insert into statemaster (name,countryid,orderid) values ('new jersey',(select id from countrymaster where name = 'usa'),30);
insert into statemaster (name,countryid,orderid) values ('new mexico',(select id from countrymaster where name = 'usa'),31);
insert into statemaster (name,countryid,orderid) values ('new york',(select id from countrymaster where name = 'usa'),32);
insert into statemaster (name,countryid,orderid) values ('north carolina',(select id from countrymaster where name = 'usa'),33);
insert into statemaster (name,countryid,orderid) values ('north dakota',(select id from countrymaster where name = 'usa'),34);
insert into statemaster (name,countryid,orderid) values ('ohio',(select id from countrymaster where name = 'usa'),35);
insert into statemaster (name,countryid,orderid) values ('oklahoma',(select id from countrymaster where name = 'usa'),36);
insert into statemaster (name,countryid,orderid) values ('oregon',(select id from countrymaster where name = 'usa'),37);
insert into statemaster (name,countryid,orderid) values ('pennsylvania',(select id from countrymaster where name = 'usa'),38);
insert into statemaster (name,countryid,orderid) values ('rhode island',(select id from countrymaster where name = 'usa'),39);
insert into statemaster (name,countryid,orderid) values ('south carolina',(select id from countrymaster where name = 'usa'),40);
insert into statemaster (name,countryid,orderid) values ('south dakota',(select id from countrymaster where name = 'usa'),41);
insert into statemaster (name,countryid,orderid) values ('tennessee',(select id from countrymaster where name = 'usa'),42);
insert into statemaster (name,countryid,orderid) values ('texas',(select id from countrymaster where name = 'usa'),43);
insert into statemaster (name,countryid,orderid) values ('utah',(select id from countrymaster where name = 'usa'),44);
insert into statemaster (name,countryid,orderid) values ('vermont',(select id from countrymaster where name = 'usa'),45);
insert into statemaster (name,countryid,orderid) values ('virginia',(select id from countrymaster where name = 'usa'),46);
insert into statemaster (name,countryid,orderid) values ('washington',(select id from countrymaster where name = 'usa'),47);
insert into statemaster (name,countryid,orderid) values ('west virginia',(select id from countrymaster where name = 'usa'),48);
insert into statemaster (name,countryid,orderid) values ('wisconsin',(select id from countrymaster where name = 'usa'),49);
insert into statemaster (name,countryid,orderid) values ('wyoming',(select id from countrymaster where name = 'usa'),50);
