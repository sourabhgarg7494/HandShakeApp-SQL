DROP PROCEDURE UpdateResumePath

DELIMITER //

CREATE PROCEDURE UpdateResumePath (IN UserId varchar(500),resume_Path varchar(500),originalFileName varchar (200))
BEGIN
	DECLARE StudentId INT;
    
    SET StudentId = (SELECT Id FROM Users where EmailID = UserId);
    
    INSERT INTO StudentResume (StudentId,ResumePath,FileName,DateUploaded) VALUES (StudentId,resume_Path,originalFileName,CURDATE());
    
    SELECT Id,ResumePath,FileName FROM StudentResume where StudentId = StudentId and ResumePath = resume_Path;
    
END; //

DELIMITER ;