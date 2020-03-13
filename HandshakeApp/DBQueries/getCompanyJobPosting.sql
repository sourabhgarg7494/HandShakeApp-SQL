DROP PROCEDURE getCompanyJobPosting
CALL getCompanyJobPosting ('sjsuusername')

DELIMITER //

CREATE PROCEDURE getCompanyJobPosting (UserId varchar(500))
BEGIN
DECLARE Company_Id int;

SET Company_Id = (SELECT Id FROM Users where EmailId = UserId);


DROP TABLE IF EXISTS jobData;
CREATE TEMPORARY TABLE jobData
SELECT DISTINCT jd.Id
	,jd.JobTitle
    ,cm.Name as City
    ,sm.Name as State
    ,(select group_concat(Name SEPARATOR ' ') FROM jobcategoryMapping jcmpp
		inner join jobcategorymaster jcm on jcm.Id = jcmpp.JobCategoryId
		where jcmpp.JobId = jd.Id) as JobCategory
FROM jobDetails jd
left join countrymaster com on Com.Id = jd.CountryId
left join StateMaster sm on sm.Id = jd.StateId
left join citymaster cm on cm.Id = jd.CityId
inner join companydetails cd on cd.CompanyId = jd.CompanyId
left join jobcategorymapping jcmp on jcmp.JobId = jd.Id
left join jobcategorymaster jcm on jcm.Id = jcmp.JobCategoryId
WHERE jd.CompanyId = Company_Id
GROUP BY jd.Id
	,jd.JobTitle
    ,com.Name
    ,cm.Name
    ,sm.Name
;
select * from jobData order by Id;

if EXISTS (select * from jobData)
THEN
	select COUNT(*) jobCount FROM jobData;
else
	select 0 jobCount;
end if;

DROP TABLE IF EXISTS firstJobDetails;

CREATE TEMPORARY TABLE firstJobDetails
SELECT DISTINCT jd.Id
	,sd.StudentId
    ,usr.EmailId
    ,CONCAT(sd.FirstName, ' ' , sd.LastName ) FullName
    ,sr.ResumePath 
    ,sr.Filename
    ,asm.Name as ApplicationStatus
FROM jobapplications ja
INNER JOIN jobdetails jd on jd.Id = ja.JobId
INNER JOIN StudentDetails sd on sd.StudentId = ja.StudentId
INNER JOIN Users usr on usr.Id = sd.StudentId
INNER JOIN applicationstatusmaster asm on asm.Id = ja.ApplicationStatusId
INNER JOIN StudentResume sr on sr.Id = ja.StudentResumeId
WHERE jd.Id = (select MIN(Id) from jobData)
;
select * from firstJobDetails;

END //

DELIMITER ;