drop procedure applyforjob

call applyforjob('test@sjsu.edu',2,'test@sjsu.edu-resume-1583897740642.pdf')

delimiter //

create procedure applyforjob(in userid varchar(500),jobid int,resume_path varchar(500))
begin
	declare studentid int;
    declare resumeid int;
    
    set studentid = (select id from users where emailid = userid);
    set resumeid = (select id from studentresume where resumepath = resume_path);
    
    insert into jobapplications (jobid,studentid,studentresumeid,applicationdate)
    values (jobid,studentid,resumeid,curdate());
    
end; //

delimiter ;
