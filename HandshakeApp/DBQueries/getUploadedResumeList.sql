drop procedure getuploadedresumelist
call getuploadedresumelist('test@sjsu.edu')

delimiter //

create procedure getuploadedresumelist (in userid varchar(500))
begin
	
    select resumepath,filename 
    from studentresume sr
    inner join users usr on usr.id = sr.studentid
    where usr.emailid = userid;
    
end; //

delimiter ;
