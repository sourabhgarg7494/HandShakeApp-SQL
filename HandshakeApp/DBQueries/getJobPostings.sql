drop procedure getjobpostings
call getjobpostings ('','','','','test@sjsu.edu')

delimiter //

create procedure getjobpostings (in city varchar(100)
								, jobtitle varchar(100)
                                , company varchar(300)
                                , jobcategoryfilter varchar(4000)
                                ,userid varchar(500))
begin
declare student_id int;
declare iscurrentstudentalreadyapplied varchar(10);

set student_id = (select id from users where emailid = userid);


drop table if exists jobdata;
create temporary table jobdata
select distinct jd.id
	,jd.jobtitle
    ,cd.companyname as companyname
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
where cm.name like concat('%',city,'%')
and jd.jobtitle like concat('%',jobtitle,'%')
and cm.name like concat('%',company,'%')
and find_in_set(jcm.name, ifnull(nullif(jobcategoryfilter,''),(select group_concat(name) from jobcategorymaster)))
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


if exists (select 1 from jobapplications where studentid = student_id and jobid = (select min(id) from jobdata)) then 
	set iscurrentstudentalreadyapplied = "true";
else 
	set iscurrentstudentalreadyapplied = "false";
end if;
drop table if exists firstjobdetails;

create temporary table firstjobdetails
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
where jd.id = (select min(id) from jobdata)
group by jd.id
	,jd.jobtitle
    ,com.name
    ,cm.name
    ,sm.name
;
select *,iscurrentstudentalreadyapplied from firstjobdetails;

end //

delimiter ;
