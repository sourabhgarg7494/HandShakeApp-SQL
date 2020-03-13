DROP PROCEDURE GetCompanyUserData

CALL GetCompanyUserData('sjsuusername')

DELIMITER //

CREATE PROCEDURE GetCompanyUserData(IN UserId varchar(500))
BEGIN
	
    select cd.CompanyId
		,cd.CompanyName
        ,cd.Address
        ,com.Name as Country
        ,sm.Name as State
        ,cm.Name as City
        ,cd.Description
        ,cd.Phone
        ,cd.ProfilePicturePath
        ,usr.EmailId
    from CompanyDetails cd
    INNER JOIN Users usr on usr.Id = cd.CompanyId
    INNER JOIN countrymaster com on com.Id = cd.CountryId
    INNER JOIN statemaster sm on sm.Id = cd.StateId
    INNER JOIN citymaster cm on cm.Id = cd.CityId
    WHERE usr.EmailId = UserId;
    
END; //

DELIMITER ;