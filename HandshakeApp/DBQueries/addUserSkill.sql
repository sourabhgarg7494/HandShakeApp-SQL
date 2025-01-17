drop procedure adduserskill

delimiter //

create procedure adduserskill (in userid varchar(500), skill varchar(400))
begin
    declare usrid int;
    declare order_id int;
    set usrid = (select id from users where emailid = userid) ;
    set order_id = (select max(orderid) + 1 from skillmaster);
    
    if exists (select id from skillmaster where name = skill) then 
		insert into studentskillmapping (studentid,skillid) values (usrid,(select id from skillmaster where name = skill));
	else 
    
		insert into skillmaster (name,orderid) values (skill,order_id);
        insert into studentskillmapping (studentid,skillid) values (usrid,(select id from skillmaster where name = skill));
	end if; 
    
end; //

delimiter ;
