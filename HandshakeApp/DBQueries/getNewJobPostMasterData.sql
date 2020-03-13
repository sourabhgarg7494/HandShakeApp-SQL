DROP PROCEDURE getNewJobPostMasterData

CALL getNewJobPostMasterData()

DELIMITER //

CREATE PROCEDURE getNewJobPostMasterData()
BEGIN
	
    select group_concat(Name) as Countries from countrymaster;
    
    select group_concat(Name) as States from statemaster;
    
    select group_concat(Name) as cities from citymaster;
    
    select Name from jobcategorymaster;
END; //

DELIMITER ;