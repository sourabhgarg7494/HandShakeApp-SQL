drop procedure getcompanysignupmaster
delimiter //

create procedure getcompanysignupmaster()
begin
	select name from countrymaster order by orderid asc;
    
    select sm.name, cm.name as country from statemaster sm
    inner join countrymaster cm on cm.id = sm.countryid
    order by sm.orderid asc;
    
    select ct.name,sm.name as citystate  from citymaster ct
    inner join statemaster sm on sm.id = ct.stateid
    order by ct.orderid asc;
    
end //

delimiter ;
