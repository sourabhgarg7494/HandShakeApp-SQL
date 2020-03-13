DROP PROCEDURE getExperienceMasterData

CALL getExperienceMasterData()

DELIMITER //

CREATE PROCEDURE getExperienceMasterData ()
BEGIN
	
    select group_concat(Name) as Countries from countrymaster;
    
    select group_concat(Name) as States from statemaster;
    
    select group_concat(Name) as cities from citymaster;
END; //

DELIMITER ;