drop procedure getmastercompanyprofile

call getmastercompanyprofile()

delimiter //

create procedure getmastercompanyprofile()
begin
	
    select group_concat(name) as countries from countrymaster;
    
    select group_concat(name) as states from statemaster;
    
    select group_concat(name) as cities from citymaster;
end; //

delimiter ;
