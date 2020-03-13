DROP PROCEDURE getNewEventPostMasterData

CALL getNewEventPostMasterData()

DELIMITER //

CREATE PROCEDURE getNewEventPostMasterData()
BEGIN
	
    select group_concat(Name) as Countries from countrymaster;
    
    select group_concat(Name) as States from statemaster;
    
    select group_concat(Name) as cities from citymaster;
    
    select Name from MajorMaster;
END; //

DELIMITER ;