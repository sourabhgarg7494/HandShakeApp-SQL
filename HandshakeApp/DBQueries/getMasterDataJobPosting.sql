drop procedure getmasterdatajobposting
call getmasterdatajobposting()

delimiter //

create procedure getmasterdatajobposting ()
begin
select name from jobcategorymaster order by orderid;

end //

delimiter ;
