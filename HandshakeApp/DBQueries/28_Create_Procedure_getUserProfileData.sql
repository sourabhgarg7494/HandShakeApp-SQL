DROP PROCEDURE GetUserData

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
    
    
END; //

DELIMITER ;