DROP PROCEDURE CreateCompanyUser;
DELIMITER //

CREATE PROCEDURE CreateCompanyUser (IN CompanyName VARCHAR(300)
                ,EmailAddress varchar(500)
                ,Country varchar(100)
                ,State varchar(100)
                ,City varchar(100)
                ,Address varchar(500)
                ,Phone varchar(20)
                ,Description varchar(1000)
                ,Password varchar(4000)
                ,PasswodSalt varchar(4000)
                ,Role varchar(50))
BEGIN
	DECLARE RoleId INT;
    DECLARE CompanyId INT;
    DECLARE CountryId INT;
    DECLARE StateId INT;
    DECLARE CityId INT;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION ROLLBACK;
    
    START TRANSACTION;
		SET RoleId = (SELECT Id FROM userroles where Name = Role);
		
		INSERT INTO users (EmailId, Password, PasswordSalt, RoleId) 
		VALUES (EmailAddress,Password,PasswodSalt,RoleId);
		
		SET CompanyId = (SELECT ID FROM users where EmailId = EmailAddress);
        SET CountryId = (SELECT ID FROM countrymaster WHERE Name = Country);
        SET StateId = (SELECT ID FROM statemaster WHERE Name = State);
        SET CityId = (SELECT ID FROM citymaster WHERE Name = City);
		
		INSERT INTO companydetails (CompanyId,CompanyName,Address,CountryId,StateId,CityId,Description,Phone)
		VALUES (CompanyId,CompanyName,Address,CountryId,StateId,CityId,Description,Phone);
        
    COMMIT;
END; //

DELIMITER ;