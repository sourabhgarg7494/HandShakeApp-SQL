drop procedure getschoolmaster
delimiter //

create procedure getschoolmaster ()
begin
	select name from schoolmaster;
    
    select name from majormaster;
end //

delimiter ;
