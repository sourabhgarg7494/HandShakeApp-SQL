drop procedure getcompanyeventlistings
call getcompanyeventlistings('sjsuusername')

delimiter //

create procedure getcompanyeventlistings (userid varchar(500))
begin
declare company_id int;

set company_id = (select id from users where emailid = userid);

drop table if exists eventdata;
create temporary table eventdata
select em.id
	,em.eventname
    ,cd.companyname as companyname
    ,cm.name as city
    ,sm.name as state
    ,em.dateandtime as eventdatetime
from eventmaster em
left join countrymaster com on com.id = em.countryid
left join statemaster sm on sm.id = em.stateid
left join citymaster cm on cm.id = em.cityid
inner join companydetails cd on cd.companyid = em.companyid
where em.companyid = company_id;

select * from eventdata order by eventdatetime asc;

if exists (select * from eventdata)
then
	select count(*) eventcount from eventdata;
else
	select 0 eventcount;
end if;

drop table if exists firsteventdetails;

create temporary table firsteventdetails
select distinct em.id
	,sd.studentid
    ,usr.emailid
	,concat(sd.firstname,' ', sd.lastname) as fullname 
from eventstudentmapping esm
inner join eventmaster em on em.id = esm.eventid
inner join studentdetails sd on sd.studentid = esm.studentid
inner join users usr on usr.id = sd.studentid
where em.id = (select id from eventdata order by eventdatetime asc limit 1);

select *  from firsteventdetails;

    
end; //

delimiter ;
