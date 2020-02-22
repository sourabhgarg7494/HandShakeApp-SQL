DELIMITER //

CREATE PROCEDURE GetUserDetailByEmailId (IN emailId VARCHAR(500))
BEGIN
	SELECT EmailId,Password,PasswordSalt FROM Users WHERE EmailId = emailId ;
END //

DELIMITER ;