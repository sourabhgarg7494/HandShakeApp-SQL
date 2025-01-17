drop procedure getexperiencemasterdata

call getexperiencemasterdata()

delimiter //

create procedure getexperiencemasterdata ()
begin
	
    select group_concat(name) as countries from countrymaster;
    
    select group_concat(name) as states from statemaster;
    
    select group_concat(name) as cities from citymaster;
end; //

delimiter ;
