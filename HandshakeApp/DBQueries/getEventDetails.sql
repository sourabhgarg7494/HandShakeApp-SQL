DROP PROCEDURE getEventDetails
CALL getEventDetails (2,'test@sjsu.edu')

DELIMITER //

CREATE PROCEDURE getEventDetails (IN Event_Id INT, UserId varchar(500))
BEGIN

DECLARE Student_Id int;
DECLARE IsCurrentStudentAlreadyRegistered VARCHAR(10);

SET Student_Id = (SELECT Id FROM Users where EmailId = UserId);

IF EXISTS (SELECT 1 FROM eventstudentmapping WHERE StudentId = Student_Id and EventId = Event_Id ) THEN 
	SET IsCurrentStudentAlreadyRegistered = "True";
ELSE 
	SET IsCurrentStudentAlreadyRegistered = "False";
END IF;

DROP TABLE IF EXISTS EventDetails;

CREATE TEMPORARY TABLE EventDetails
SELECT em.Id
	,em.EventName
    ,cd.CompanyName as CompanyName
    ,(select group_concat(Name) FROM eventeligiblemajormapping eemmm
		inner join majormaster mm on mm.Id = eemmm.EligibleMajorId
		where eemmm.EventId = em.Id) as EligibleMajors
    ,cm.Name as City
    ,sm.Name as State
    ,com.Name as Country
    ,em.Description
    ,DATE_FORMAT(em.DateAndTime, "%b %d") as EventDate
    ,DATE_FORMAT(em.DateAndTime, "%r") as EventTime
    ,em.Address as Address
FROM eventmaster em
left join countrymaster com on Com.Id = em.CountryId
left join StateMaster sm on sm.Id = em.StateId
left join citymaster cm on cm.Id = em.CityId
inner join companydetails cd on cd.CompanyId = em.CompanyId
left join eventeligiblemajormapping eemm on eemm.EventId = em.Id
left join majormaster mm on mm.Id = eemm.EligibleMajorId
WHERE em.Id = Event_Id
GROUP BY em.Id
	,em.EventName
    ,cd.CompanyName
    ,cm.Name
    ,sm.Name
    ,com.Name
    ,em.Description
    ,em.DateAndTime
    ,em.Address
;
select *,IsCurrentStudentAlreadyRegistered  from EventDetails;

select mm.Name from studenteducationdetailsmapping sedm
INNER JOIN majormaster mm on mm.Id = sedm.MajorId
WHERE sedm.StudentId= Student_Id
Order By sedm.StartDate DESC LIMIT 1;

END //

DELIMITER ;
