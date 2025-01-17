drop procedure getneweventpostmasterdata

call getneweventpostmasterdata()

delimiter //

create procedure getneweventpostmasterdata()
begin
	
    select group_concat(name) as countries from countrymaster;
    
    select group_concat(name) as states from statemaster;
    
    select group_concat(name) as cities from citymaster;
    
    select name from majormaster;
end; //

delimiter ;
