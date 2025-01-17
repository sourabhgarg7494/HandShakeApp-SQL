drop procedure registerforevent

call registerforevent(1, 'test@sjsu.edu')

delimiter //

create procedure registerforevent(in event_id int, userid varchar(500))
begin
	declare studentid int;
    
    set studentid = (select id from users where emailid = userid);
    
    insert into eventstudentmapping (eventid,studentid)
    values (event_id,studentid);
    
end; //

delimiter ;
