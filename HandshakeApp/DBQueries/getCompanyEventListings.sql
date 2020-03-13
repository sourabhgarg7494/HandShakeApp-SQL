DROP PROCEDURE getCompanyEventListings
CALL getCompanyEventListings('sjsuusername')

DELIMITER //

CREATE PROCEDURE getCompanyEventListings (UserId varchar(500))
BEGIN
DECLARE Company_Id int;

SET Company_Id = (SELECT Id FROM Users where EmailId = UserId);

DROP TABLE IF EXISTS eventData;
CREATE TEMPORARY TABLE eventData
SELECT em.Id
	,em.EventName
    ,cd.CompanyName as CompanyName
    ,cm.Name as City
    ,sm.Name as State
    ,em.DateAndTime as EventDateTime
FROM eventmaster em
left join countrymaster com on Com.Id = em.CountryId
left join StateMaster sm on sm.Id = em.StateId
left join citymaster cm on cm.Id = em.CityId
inner join companydetails cd on cd.CompanyId = em.CompanyId
WHERE em.CompanyId = Company_Id;

select * from eventData order by EventDateTime ASC;

if EXISTS (select * from eventData)
THEN
	select COUNT(*) eventCount FROM eventData;
else
	select 0 eventCount;
end if;

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
WHERE em.Id = (select Id from eventData order By EventDateTime ASC LIMIT 1);

select *  from firstEventDetails;

    
END; //

DELIMITER ;