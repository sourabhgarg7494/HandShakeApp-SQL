DROP PROCEDURE applyForJob

CALL applyForJob('test@sjsu.edu',2,'test@sjsu.edu-Resume-1583897740642.pdf')

DELIMITER //

CREATE PROCEDURE applyForJob(IN UserId varchar(500),JobId INT,Resume_Path varchar(500))
BEGIN
	DECLARE StudentId int;
    DECLARE ResumeId INT;
    
    SET StudentId = (SELECT ID from users where EmailId = UserId);
    SET ResumeId = (select Id from studentresume where ResumePath = Resume_Path);
    
    INSERT INTO jobapplications (JobId,StudentId,StudentResumeId,ApplicationDate)
    VALUES (JobId,StudentId,ResumeId,curdate());
    
END; //

DELIMITER ;