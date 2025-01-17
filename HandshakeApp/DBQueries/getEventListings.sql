drop procedure geteventlistings
call geteventlistings('','test@sjsu.edu')

delimiter //

create procedure geteventlistings (in eventname varchar(250),userid varchar(500))
begin
declare student_id int;
declare iscurrentstudentalreadyregistered varchar(10);

set student_id = (select id from users where emailid = userid);

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
where em.eventname like concat('%',eventname,'%');

select * from eventdata order by eventdatetime asc;

if exists (select * from eventdata)
then
	select count(*) eventcount from eventdata;
else
	select 0 eventcount;
end if;

if exists (select 1 from eventstudentmapping where studentid = student_id and eventid = (select id from eventdata order by eventdatetime desc limit 1)) then 
	set iscurrentstudentalreadyregistered = "true";
else 
	set iscurrentstudentalreadyregistered = "false";
end if;

drop table if exists firsteventdetails;

create temporary table firsteventdetails
select em.id
	,em.eventname
    ,cd.companyname as companyname
    ,(select group_concat(name) from eventeligiblemajormapping eemmm
		inner join majormaster mm on mm.id = eemmm.eligiblemajorid
		where eemmm.eventid = em.id) as eligiblemajors
    ,cm.name as city
    ,sm.name as state
    ,com.name as country
    ,em.description
    ,date_format(em.dateandtime, "%b %d") as eventdate
    ,date_format(em.dateandtime, "%r") as eventtime
    ,em.address as address
from eventmaster em
left join countrymaster com on com.id = em.countryid
left join statemaster sm on sm.id = em.stateid
left join citymaster cm on cm.id = em.cityid
inner join companydetails cd on cd.companyid = em.companyid
left join eventeligiblemajormapping eemm on eemm.eventid = em.id
left join majormaster mm on mm.id = eemm.eligiblemajorid
where em.id = (select id from eventdata order by eventdatetime asc limit 1)
group by em.id
	,em.eventname
    ,cd.companyname
    ,cm.name
    ,sm.name
    ,com.name
    ,em.description
    ,em.dateandtime
    ,em.address
;
select *,iscurrentstudentalreadyregistered  from firsteventdetails;

select mm.name from studenteducationdetailsmapping sedm
inner join majormaster mm on mm.id = sedm.majorid
where sedm.studentid= student_id
order by sedm.startdate desc limit 1;

    
end; //

delimiter ;
