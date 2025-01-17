drop procedure getstudentfilterdata 
call getstudentfilterdata ('','','',',angularjs',1,20,'test@sjsu.edu')

delimiter //

create procedure getstudentfilterdata (in studentname varchar(500)
								, schoolname varchar(4000)
                                , major varchar(4000)
                                , skill varchar(4000)
                                , startindex int
                                , rowcount int
                                , userid varchar(500))
begin
drop table if exists searchdata;
create temporary table searchdata
select * from 
	(
select row_number() over (order by sd.fullname asc) as row_num
		,sd.fullname
        ,sd.profilepicturepath
		,sdem.studentid
        ,date_format(sdem.enddate,'%m, %y') as graddate
        ,sm.name as schoolname
        ,mm.name as majorname 
        ,seml.companyname
        ,seml.title
        ,usr.emailid
from studenteducationdetailsmapping sdem
inner join (select studentid, max(enddate) as enddate
			from studenteducationdetailsmapping 
			group by studentid) sdf on sdf.studentid = sdem.studentid and sdf.enddate = sdem.enddate
inner join schoolmaster sm on sm.id = sdem.schoolid
inner join majormaster mm on mm.id = sdem.majorid
inner join (select concat(firstname,' ',lastname) as fullname
				  , studentid, profilepicturepath
			from studentdetails) sd on sd.studentid = sdem.studentid
inner join users usr on usr.id = sd.studentid
left join ( select sem.* from studentexperiencemapping sem
			inner join ( select studentid, max(enddate) as enddate
			from studentexperiencemapping 
            group by studentid) seml on seml.studentid = sem.studentid and seml.enddate = sem.enddate
            ) seml on seml.studentid = sd.studentid
left join studentskillmapping ssm on ssm.studentid = sd.studentid
left join skillmaster skm on skm.id = ssm.skillid
where find_in_set(mm.name, ifnull(nullif(major,''),(select group_concat(name) from majormaster)))
and find_in_set(sm.name, ifnull(nullif(schoolname,''),(select group_concat(name) from schoolmaster)))      
and 1 = case when ifnull(skill,'') = '' and ifnull(skm.name,'') = '' then 1
			when find_in_set(skm.name, ifnull(nullif(skill,''),(select group_concat(name) from skillmaster))) is not null 
                and find_in_set(skm.name, ifnull(nullif(skill,''),(select group_concat(name) from skillmaster))) != 0 
                then 1
            else 0 end
and 1 = case when ifnull(studentname,'') = '' then 1
			when sd.fullname like concat('%',studentname,'%') then 1
            else 0 end
and usr.emailid not like userid      
group by sd.fullname
        ,sd.profilepicturepath
		,sdem.studentid
        ,sdem.enddate
        ,sm.name 
        ,mm.name 
        ,seml.companyname
        ,seml.title
        ,usr.emailid
    ) as stu
;


select * from searchdata where row_num >= startindex
limit rowcount;

select ceil(count(1)/rowcount) as pagecount from searchdata ;

end //

delimiter ;

