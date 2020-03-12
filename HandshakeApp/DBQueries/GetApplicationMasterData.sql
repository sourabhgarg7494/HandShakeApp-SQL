DROP PROCEDURE GetApplicationMasterData
CALL GetApplicationMasterData(1)

DELIMITER //

CREATE PROCEDURE GetApplicationMasterData (IN UserId varchar(500))
BEGIN
	DECLARE StudentId INT;
    
    SET StudentId = (SELECT Id FROM Users where EmailID = UserId);
    
    SELECT distinct asm.Name from applicationstatusmaster asm
    INNER JOIN jobapplications ja on ja.ApplicationStatusId = asm.Id
    INNER JOIN users usr on usr.Id = ja.StudentId;
    
END; //

DELIMITER ;