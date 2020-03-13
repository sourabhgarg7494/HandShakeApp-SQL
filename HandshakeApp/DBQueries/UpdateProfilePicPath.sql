DROP PROCEDURE UpdateProfilePicPath

DELIMITER //

CREATE PROCEDURE UpdateProfilePicPath (IN UserId varchar(500),profilePicPath varchar(500))
BEGIN

	DECLARE UserRole varchar(50);
    
    SET UserRole = (SELECT ur.Name 
					FROM userroles ur 
                    inner join users usr on usr.RoleId = ur.Id
                    where usr.EmailId = UserId
                    );
	
    if (UserRole = 'Student')
    THEN 
		UPDATE studentdetails sd
		INNER JOIN Users usr ON usr.Id = sd.StudentId
		SET SD.ProfilePicturePath = profilePicPath
		WHERE usr.EmailId = UserId;
                
		select ProfilePicturePath from studentdetails sd
		INNER JOIN users usr on usr.Id = sd.StudentId
		where usr.EmailId = UserId ;
	ELSE
		UPDATE companydetails cd
        INNER JOIN Users usr on usr.Id = cd.CompanyId
        SET cd.ProfilePicturePath = profilePicPath
        WHERE usr.EmailId = UserId;
        
		select ProfilePicturePath from CompanyDetails cd
		INNER JOIN users usr on usr.Id = cd.CompanyId
		where usr.EmailId = UserId ;

	END IF;
    
    
END; //

DELIMITER ;