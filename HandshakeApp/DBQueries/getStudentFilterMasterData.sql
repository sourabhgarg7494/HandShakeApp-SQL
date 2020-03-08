DROP PROCEDURE getStudentFilterMasterData 
DELIMITER //

CREATE PROCEDURE getStudentFilterMasterData ()
BEGIN

	select Name FROM SchoolMAster order By OrderId ASC;
    
    select Name FROM majormaster Order by OrderId ASC;
END //

DELIMITER ;

