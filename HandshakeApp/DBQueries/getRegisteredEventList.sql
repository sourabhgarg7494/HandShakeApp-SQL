DROP PROCEDURE getRegisteredEventList 

CALL getRegisteredEventList('test@sjsu.edu')

DELIMITER //

CREATE PROCEDURE getRegisteredEventList(IN UserId varchar(500))
BEGIN    

	DECLARE EventCount INT;

    select em.EventName
		,cd.CompanyName
		,DATE_FORMAT(em.DateAndTime, "%b %d") as EventDate
		,DATE_FORMAT(em.DateAndTime, "%r") as EventTime
        ,em.Address
        ,sm.Name State
        ,cm.Name City
    FROM eventstudentmapping ESM
    INNER JOIN eventmaster em on em.Id = ESM.EventId
    INNER JOIN companydetails cd on cd.CompanyId = em.CompanyId
    INNER JOIN statemaster sm on sm.Id = em.StateId
    INNER JOIN citymaster cm on cm.Id = em.CityId
    INNER JOIN Users usr on usr.Id = ESM.StudentId
    WHERE usr.EmailId = UserId;

    SELECT COUNT(*) as EventCount FROM eventstudentmapping esm
    INNER JOIN users usr on usr.Id = esm.StudentId
    where usr.EmailId = UserId;
    
END; //

DELIMITER ;