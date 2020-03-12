DROP PROCEDURE getJobDetails
CALL getJobDetails (2,'test@sjsu.edu')

DELIMITER //

CREATE PROCEDURE getJobDetails (IN JobId INT, UserId varchar(500))
BEGIN

DECLARE Student_Id int;
DECLARE IsCurrentStudentAlreadyApplied VARCHAR(10);

SET Student_Id = (SELECT Id FROM Users where EmailId = UserId);

IF EXISTS (SELECT 1 FROM jobapplications ja WHERE ja.StudentId = Student_Id and ja.JobId = JobId) THEN 
	SET IsCurrentStudentAlreadyApplied = "True";
ELSE 
	SET IsCurrentStudentAlreadyApplied = "False";
END IF;

DROP TABLE IF EXISTS jobData;
CREATE TEMPORARY TABLE jobData
SELECT DISTINCT jd.Id
	,jd.JobTitle
    ,cd.CompanyName as CompanyName
    ,(select group_concat(Name SEPARATOR ' ') FROM jobcategoryMapping jcmpp
		inner join jobcategorymaster jcm on jcm.Id = jcmpp.JobCategoryId
		where jcmpp.JobId = jd.Id) as JobCategory
    ,cm.Name as City
    ,sm.Name as State
    ,com.Name as Country
    ,jd.salary
    ,DATE_FORMAT(jd.PostingDate, "%b %d") as PostingDate
    ,DATE_FORMAT(jd.ApplicationDeadLineDate, "%M %d, %Y") as ApplicationDeadLineDate
    ,jd.Address as Address
    ,jd.JobDescription as JobDescription
FROM jobDetails jd
left join countrymaster com on Com.Id = jd.CountryId
left join StateMaster sm on sm.Id = jd.StateId
left join citymaster cm on cm.Id = jd.CityId
inner join companydetails cd on cd.CompanyId = jd.CompanyId
left join jobcategorymapping jcmp on jcmp.JobId = jd.Id
left join jobcategorymaster jcm on jcm.Id = jcmp.JobCategoryId
WHERE jd.Id = JobId
GROUP BY jd.Id
	,jd.JobTitle
    ,com.Name
    ,cm.Name
    ,sm.Name
;
select *,IsCurrentStudentAlreadyApplied from jobData;

END //

DELIMITER ;
