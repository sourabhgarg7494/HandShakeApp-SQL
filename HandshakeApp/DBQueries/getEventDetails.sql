drop procedure geteventdetails
call geteventdetails (2,'test@sjsu.edu')

delimiter //

create procedure geteventdetails (in event_id int, userid varchar(500))
begin

declare student_id int;
declare iscurrentstudentalreadyregistered varchar(10);

set student_id = (select id from users where emailid = userid);

if exists (select 1 from eventstudentmapping where studentid = student_id and eventid = event_id ) then 
	set iscurrentstudentalreadyregistered = "true";
else 
	set iscurrentstudentalreadyregistered = "false";
end if;

drop table if exists eventdetails;

create temporary table eventdetails
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
where em.id = event_id
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
select *,iscurrentstudentalreadyregistered  from eventdetails;

select mm.name from studenteducationdetailsmapping sedm
inner join majormaster mm on mm.id = sedm.majorid
where sedm.studentid= student_id
order by sedm.startdate desc limit 1;

end //

delimiter ;
