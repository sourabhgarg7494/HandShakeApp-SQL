drop procedure updateobjective 

delimiter //

create procedure updateobjective(in userid varchar(500),objective varchar(1000))
begin

    declare student_id int;
    
    set student_id = (select id from users where emailid =userid);
	update studentdetails set carrerobjective = objective where studentid = student_id;
    
end; //

delimiter ;
