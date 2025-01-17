drop procedure updatestatus

delimiter //

create procedure updatestatus (in status varchar(20),job_id int, student_id int)
begin

	declare statusid int;
    
    set statusid = (select id from applicationstatusmaster where name = status);
	
    if (statusid is not null and statusid !='')
    then 
		update jobapplications ja
		set ja.applicationstatusid = statusid
		where ja.jobid = job_id and ja.studentid = student_id;
	end if;
    
    
end; //

delimiter ;
