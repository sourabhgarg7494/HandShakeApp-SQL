drop procedure fetchjobapplications
call fetchjobapplications (2)

delimiter //

create procedure fetchjobapplications (job_id int)
begin

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
where jd.id = job_id
;
select * from firstjobdetails;

end //

delimiter ;
