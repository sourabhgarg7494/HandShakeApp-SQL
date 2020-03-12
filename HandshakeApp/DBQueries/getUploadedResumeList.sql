DROP PROCEDURE getUploadedResumeList
CALL getUploadedResumeList('test@sjsu.edu')

DELIMITER //

CREATE PROCEDURE getUploadedResumeList (IN UserId varchar(500))
BEGIN
	
    select ResumePath,FileName 
    from StudentResume sr
    INNER JOIN users usr on usr.Id = sr.StudentId
    where usr.EmailId = UserId;
    
END; //

DELIMITER ;