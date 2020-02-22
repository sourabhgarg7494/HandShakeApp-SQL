DROP PROCEDURE UpdateProfilePicPath

DELIMITER //

CREATE PROCEDURE UpdateProfilePicPath (IN UserId varchar(500),profilePicPath varchar(500))
BEGIN
	
    UPDATE studentdetails sd
    INNER JOIN Users usr ON usr.Id = sd.StudentId
    SET SD.ProfilePicturePath = profilePicPath
    WHERE usr.EmailId = UserId;
    
    select ProfilePicturePath from studentdetails sd
    INNER JOIN users usr on usr.Id = sd.StudentId
    where usr.EmailId = UserId ;
    
END; //

DELIMITER ;