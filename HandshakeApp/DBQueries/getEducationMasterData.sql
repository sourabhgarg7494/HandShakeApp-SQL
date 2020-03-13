DROP PROCEDURE getEducationMasterData
DELIMITER //

CREATE PROCEDURE getEducationMasterData ()
BEGIN
	SELECT group_concat(Name) as schools FROM SchoolMaster;
    
    SELECT group_concat(Name) as majors FROM MAJORMaster;
END //

DELIMITER ;