drop procedure getcompanyjobposting
call getcompanyjobposting ('sjsuusername')

delimiter //

create procedure getcompanyjobposting (userid varchar(500))
begin
declare company_id int;

set company_id = (select id from users where emailid = userid);


drop table if exists jobdata;
create temporary table jobdata
select distinct jd.id
	,jd.jobtitle
    ,cm.name as city
    ,sm.name as state
    ,(select group_concat(name separator ' ') from jobcategorymapping jcmpp
		inner join jobcategorymaster jcm on jcm.id = jcmpp.jobcategoryid
		where jcmpp.jobid = jd.id) as jobcategory
from jobdetails jd
left join countrymaster com on com.id = jd.countryid
left join statemaster sm on sm.id = jd.stateid
left join citymaster cm on cm.id = jd.cityid
inner join companydetails cd on cd.companyid = jd.companyid
left join jobcategorymapping jcmp on jcmp.jobid = jd.id
left join jobcategorymaster jcm on jcm.id = jcmp.jobcategoryid
where jd.companyid = company_id
group by jd.id
	,jd.jobtitle
    ,com.name
    ,cm.name
    ,sm.name
;
select * from jobdata order by id;

if exists (select * from jobdata)
then
	select count(*) jobcount from jobdata;
else
	select 0 jobcount;
end if;

drop table if exists firstjobdetails;

create temporary table firstjobdetails
select distinct jd.id
	,sd.studentid
    ,usr.emailid
    ,concat(sd.firstname, ' ' , sd.lastname ) fullname
    ,sr.resumepath 
    ,sr.filename
    ,asm.name as applicationstatus
from jobapplications ja
inner join jobdetails jd on jd.id = ja.jobid
inner join studentdetails sd on sd.studentid = ja.studentid
inner join users usr on usr.id = sd.studentid
inner join applicationstatusmaster asm on asm.id = ja.applicationstatusid
inner join studentresume sr on sr.id = ja.studentresumeid
where jd.id = (select min(id) from jobdata)
;
select * from firstjobdetails;

end //

delimiter ;
