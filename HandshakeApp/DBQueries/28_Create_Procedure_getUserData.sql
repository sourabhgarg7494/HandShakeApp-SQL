DROP PROCEDURE GetUserData

CALL GetUserData('test@sjsu.edu')

DELIMITER //

CREATE PROCEDURE GetUserData (IN UserId varchar(500))
BEGIN
	
    select CarrerObjective from studentdetails sd
    INNER JOIN users usr ON usr.Id = sd.StudentId
    WHERE usr.EmailId = UserId;
    
    select usr.EmailId ,gm.Name as Gender from users usr 
    left join studentdetails sd on sd.studentId = usr.Id
    left join gendermaster gm on gm.Id = sd.GenderId
    where usr.EmailId = UserId;
	
	select FirstName, LastName,sm.Name as SchoolName, mm.Name as Major, sedm.CumulativeGPA,sd.ProfilePicturePath FROM studentdetails sd
    LEFT JOIN studenteducationdetailsmapping sedm ON SEDM.StudentId = SD.StudentId
    LEFT JOIN Schoolmaster sm on sm.Id = SEDM.SchoolId
    LEFT JOIN majormaster mm ON mm.Id = SEDM.MajorId
    INNER JOIN users usr on usr.Id = sedm.StudentId
    WHERE usr.EmailId = UserId
    ORDER By SEDM.StartDate DESC LIMIT 1;
    
    SELECT SM.Name as SchoolName, DATE_FORMAT(StartDate,'%M %Y') AS StartDate
    ,DATE_FORMAT(EndDate,'%M %Y') AS EndDate
    ,mm.Name as Major
    ,CumulativeGPA 
    FROM studenteducationdetailsmapping sedm
    LEFT JOIN Schoolmaster sm on sm.Id = SEDM.SchoolId
    LEFT JOIN majormaster mm ON mm.Id = SEDM.MajorId
    INNER JOIN users usr on usr.Id = sedm.StudentId
    WHERE usr.EmailId = UserId;
    
    select SM.Name from studentskillmapping SSM
    INNER JOIN skillmaster SM ON SM.Id = SSM.SkillId
    INNER JOIN users usr on usr.Id = SSM.StudentId
    WHERE usr.EmailId = UserId;
    
    SELECT SEM.CompanyName
		,SEM.Title
        ,SEM.Address
        ,SM.Name as State
        ,CM.Name as City
        ,Com.Name as Country
        ,date_format(SEM.StartDate,'%b-%Y') as StartDate
        ,date_format(SEM.EndDate,'%b-%Y') as EndDate
        ,SEM.WorkDescription
    FROM studentexperiencemapping SEM
    LEFT JOIN StateMaster SM on SM.Id = SEM.StateId
    LEFT JOIN CityMaster CM on CM.Id = SEM.CityId
    LEFT JOIN CountryMaster Com on Com.Id = SEM.CountryId
    INNER JOIN Users usr on usr.Id = SEM.StudentId
    WHERE usr.EmailId = UserId;
    
END; //

DELIMITER ;