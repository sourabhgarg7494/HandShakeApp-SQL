
DELIMITER //

CREATE PROCEDURE CreateUser (IN School VARCHAR(500)
				,FirstName varchar(100)
                ,LastName varchar(100)
                ,EmailAddress varchar(500)
                ,Major varchar(200)
                ,GradMonth varchar(10)
                ,GradYear varchar(4)
                ,Password varchar(4000)
                ,PasswodSalt varchar(4000)
                ,Role varchar(50))
BEGIN
	DECLARE RoleId INT;
    DECLARE StudentId INT;
    DECLARE SchoolId INT;
    DECLARE MajorId INT;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION ROLLBACK;
    
    START TRANSACTION;
		SET RoleId = (SELECT Id FROM userroles where Name = Role);
		
		INSERT INTO users (EmailId, Password, PasswordSalt, RoleId) 
		VALUES (EmailAddress,Password,PasswodSalt,RoleId);
		
		SET StudentId = (SELECT ID FROM users where EmailId = EmailAddress);
		
		INSERT INTO StudentDetails (StudentId,FirstName,LastName)
		VALUES (StudentId,FirstName,LastName);
		
		SET SchoolId = (SELECT  Id FROM schoolmaster WHERE Name = School);
		SET MajorId = (SELECT Id FROM majormaster WHERE Name = Major);
		
		INSERT INTO studenteducationdetailsmapping (StudentId,SchoolId,EndDate,MajorId)
		VALUES (StudentId,SchoolId,str_to_date(CONCAT(GradMonth,' ',GradYear),'%M %Y'),MajorId);
    COMMIT;
END; //

DELIMITER ;