DROP PROCEDURE getCompanyEventStudentList
CALL getCompanyEventStudentList(1)

DELIMITER //

CREATE PROCEDURE getCompanyEventStudentList (Event_Id INT)
BEGIN

DROP TABLE IF EXISTS firstEventDetails;

CREATE TEMPORARY TABLE firstEventDetails
SELECT distinct em.Id
	,sd.StudentId
    ,usr.EmailId
	,Concat(sd.FirstName,' ', sd.LastName) as FullName 
FROM EventStudentMapping esm
INNER JOIN eventmaster em on em.Id = esm.EventId
INNER JOIN studentdetails sd on sd.StudentId = esm.StudentId
INNER JOIN users usr on usr.Id = sd.StudentId
WHERE em.Id = Event_ID;

select *  from firstEventDetails;

    
END; //

DELIMITER ;