drop procedure updateoverviewdata

delimiter //

create procedure updateoverviewdata (in userid varchar(500),first_name varchar(100), last_name varchar(100))
begin
	
    update studentdetails sd
    inner join users usr on usr.id = sd.studentid
    set sd.firstname = first_name, sd.lastname = last_name 
    where usr.emailid = userid;
    
    select firstname,lastname from studentdetails sd
    inner join users usr on usr.id = sd.studentid
    where usr.emailid = userid;
    
end; //

delimiter ;
