drop procedure getjobdetails
call getjobdetails (2,'test@sjsu.edu')

delimiter //

create procedure getjobdetails (in jobid int, userid varchar(500))
begin

declare student_id int;
declare iscurrentstudentalreadyapplied varchar(10);

set student_id = (select id from users where emailid = userid);

if exists (select 1 from jobapplications ja where ja.studentid = student_id and ja.jobid = jobid) then 
	set iscurrentstudentalreadyapplied = "true";
else 
	set iscurrentstudentalreadyapplied = "false";
end if;

drop table if exists jobdata;
create temporary table jobdata
select distinct jd.id
	,jd.jobtitle
    ,cd.companyname as companyname
    ,(select group_concat(name separator ' ') from jobcategorymapping jcmpp
		inner join jobcategorymaster jcm on jcm.id = jcmpp.jobcategoryid
		where jcmpp.jobid = jd.id) as jobcategory
    ,cm.name as city
    ,sm.name as state
    ,com.name as country
    ,jd.salary
    ,date_format(jd.postingdate, "%b %d") as postingdate
    ,date_format(jd.applicationdeadlinedate, "%m %d, %y") as applicationdeadlinedate
    ,jd.address as address
    ,jd.jobdescription as jobdescription
from jobdetails jd
left join countrymaster com on com.id = jd.countryid
left join statemaster sm on sm.id = jd.stateid
left join citymaster cm on cm.id = jd.cityid
inner join companydetails cd on cd.companyid = jd.companyid
left join jobcategorymapping jcmp on jcmp.jobid = jd.id
left join jobcategorymaster jcm on jcm.id = jcmp.jobcategoryid
where jd.id = jobid
group by jd.id
	,jd.jobtitle
    ,com.name
    ,cm.name
    ,sm.name
;
select *,iscurrentstudentalreadyapplied from jobdata;

end //

delimiter ;
