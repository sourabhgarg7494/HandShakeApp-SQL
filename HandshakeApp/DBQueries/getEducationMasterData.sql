drop procedure geteducationmasterdata
delimiter //

create procedure geteducationmasterdata ()
begin
	select group_concat(name) as schools from schoolmaster;
    
    select group_concat(name) as majors from majormaster;
end //

delimiter ;
