DROP PROCEDURE UpdateOverviewData

DELIMITER //

CREATE PROCEDURE UpdateOverviewData (IN UserId varchar(500),first_Name varchar(100), last_Name varchar(100))
BEGIN
	
    UPDATE studentdetails sd
    INNER JOIN Users usr ON usr.Id = sd.StudentId
    SET SD.FirstName = first_Name, SD.LastName = last_Name 
    WHERE usr.EmailId = UserId;
    
    select FirstName,LastName FROM StudentDetails SD
    inner join Users usr on usr.Id = Sd.StudentId
    WHERE usr.EmailId = UserId;
    
END; //

DELIMITER ;