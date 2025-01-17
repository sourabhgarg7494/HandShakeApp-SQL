drop procedure getnewjobpostmasterdata

call getnewjobpostmasterdata()

delimiter //

create procedure getnewjobpostmasterdata()
begin
	
    select group_concat(name) as countries from countrymaster;
    
    select group_concat(name) as states from statemaster;
    
    select group_concat(name) as cities from citymaster;
    
    select name from jobcategorymaster;
end; //

delimiter ;
