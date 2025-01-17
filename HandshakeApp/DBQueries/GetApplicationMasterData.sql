drop procedure getapplicationmasterdata
call getapplicationmasterdata(1)

delimiter //

create procedure getapplicationmasterdata (in userid varchar(500))
begin
	declare studentid int;
    
    set studentid = (select id from users where emailid = userid);
    
    select distinct asm.name from applicationstatusmaster asm
    inner join jobapplications ja on ja.applicationstatusid = asm.id
    inner join users usr on usr.id = ja.studentid;
    
end; //

delimiter ;
