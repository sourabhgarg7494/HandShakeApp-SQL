drop procedure getapplicationdata 

call getapplicationdata('test@sjsu.edu','')

delimiter //

create procedure getapplicationdata(in userid varchar(500),jobstatusfilter varchar(4000))
begin    
    select jd.jobtitle
		,cd.companyname
        ,asm.name as applicationstatus
        ,date_format(ja.applicationdate,'%b %e') as applicationdate
        ,date_format(jd.applicationdeadlinedate,'%b %e') as applicationdeadlinedate
	from jobapplications ja
    inner join users usr on usr.id = ja.studentid
    inner join applicationstatusmaster asm on asm.id = ja.applicationstatusid
    inner join jobdetails jd on jd.id = ja.jobid
    inner join companydetails cd on cd.companyid = jd.companyid
    where usr.emailid = userid 
    and find_in_set(asm.name,ifnull(nullif(jobstatusfilter,''),(select group_concat(name) from applicationstatusmaster)));
    
    select count(1) as jobcount from jobapplications ja 
    inner join users usr on usr.id = ja.studentid
    where usr.emailid = userid;
    
end; //

delimiter ;
