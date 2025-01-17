drop procedure deleteuserskill

delimiter //

create procedure deleteuserskill (in userid varchar(500), skill varchar(400))
begin
    declare usrid int;
    
    set usrid = (select id from users where emailid = userid) ;
    
    if exists (select id from skillmaster where name = skill) then 
		delete from studentskillmapping where studentid = usrid and skillid = (select id from skillmaster where name = skill);
	end if; 
    
end; //

delimiter ;
