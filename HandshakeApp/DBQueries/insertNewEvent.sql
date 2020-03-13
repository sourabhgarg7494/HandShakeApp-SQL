DROP PROCEDURE insertNewEvent
CALL insertNewEvent('sjsuusername','EventName','description','20-Dec-2020: 12:30','USA','California','San Jose','address',',Computer Engineering,Chemical Engineering,Electric Engineering,Industrial Engineering,Software Engineering')
DELIMITER //

CREATE PROCEDURE insertNewEvent (IN UserId varchar(500)
						,Event_Name varchar(250)
                        ,Descriptionnew varchar(2000)
                        ,DateAndTime varchar(100)
						,Country varchar(100)
                        ,State varchar(100)
                        ,City varchar(100)
                        ,Addressnew varchar(500)
                        ,EligibleMajors varchar(4000))
BEGIN
	
    DECLARE state_id INT;
    DECLARE city_Id INT;
    DECLARE country_ID INT;
    DECLARE Company_Id INT;
    DECLARE new_EventId int;
    
    SET state_id = (SELECT Id from statemaster where name =state);
    
    SET city_Id = (SELECT Id from citymaster where name =City);
    
    SET country_ID = (SELECT Id from countrymaster where name =Country);
    
    SET Company_Id = (SELECT Id from users where EmailId =UserId);
    
    INSERT INTO EventMaster (EventName,Description,DateAndTime,CountryId,StateId,CityId,Address,CompanyId)
    VALUES (Event_Name,Descriptionnew,str_to_date(DateAndTime,'%e-%b-%Y: %l:%i'),country_ID,state_id,city_Id,Addressnew,Company_Id);
    
    SET new_EventId = (select Id from EventMaster where CompanyId = Company_Id order by Id DESC LIMIT 1);
    
	drop temporary table if exists tempMajors;
	create temporary table tempMajors( Major varchar(200) );
    
	set @sqlquery = concat("insert into tempMajors (Major) values ('", replace(EligibleMajors, ",", "'),('"),"');");
	prepare query1 from @sqlquery;
	execute query1;
    
    INSERT INTO EventEligibleMajorMapping (EventId,EligibleMajorId)
    SELECT new_EventId, mm.Id
    FROM majormaster mm
    INNER JOIN tempMajors tm on tm.Major = mm.Name;
    
END; //

DELIMITER ;