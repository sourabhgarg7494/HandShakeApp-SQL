DROP PROCEDURE GetUserDetailByEmailId 
DELIMITER //

CREATE PROCEDURE GetUserDetailByEmailId (IN emailId VARCHAR(500))
BEGIN
	SELECT EmailId,Password,PasswordSalt,ur.Name as UserRole FROM Users usr
    LEFT JOIN userroles ur on ur.Id = usr.RoleId
    WHERE usr.EmailId = emailId;
END //

DELIMITER ;