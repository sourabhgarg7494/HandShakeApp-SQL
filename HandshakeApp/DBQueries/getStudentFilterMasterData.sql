drop procedure getstudentfiltermasterdata 
delimiter //

create procedure getstudentfiltermasterdata ()
begin

	select name from schoolmaster order by orderid asc;
    
    select name from majormaster order by orderid asc;
    
    select name from skillmaster order by orderid asc;
end //

delimiter ;


