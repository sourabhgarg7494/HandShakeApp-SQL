DROP PROCEDURE GetCompanySignUpMaster
DELIMITER //

CREATE PROCEDURE GetCompanySignUpMaster()
BEGIN
	SELECT Name FROM countrymaster Order BY OrderId ASC;
    
    SELECT sm.Name, cm.name as country FROM statemaster sm
    INNER JOIN countrymaster cm on cm.Id = sm.CountryId
    Order BY SM.OrderId ASC;
    
    SELECT ct.Name,sm.Name as cityState  FROM citymaster ct
    INNER JOIN stateMAster sm on sm.Id = ct.StateId
    ORDER BY ct.OrderId ASC;
    
END //

DELIMITER ;