DROP PROCEDURE getJobPostings
CALL getJobPostings ('','','','','test@sjsu.edu')

DELIMITER //

CREATE PROCEDURE getJobPostings (IN City VARCHAR(100)
								, jobTitle varchar(100)
                                , company varchar(300)
                                , jobCategoryFilter varchar(4000)
                                ,UserId varchar(500))
BEGIN
DECLARE Student_Id int;
DECLARE IsCurrentStudentAlreadyApplied VARCHAR(10);

SET Student_Id = (SELECT Id FROM Users where EmailId = UserId);


DROP TABLE IF EXISTS jobData;
CREATE TEMPORARY TABLE jobData
SELECT DISTINCT jd.Id
	,jd.JobTitle
    ,cd.CompanyName as CompanyName
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
WHERE cm.Name like CONCAT('%',City,'%')
AND jd.JobTitle like CONCAT('%',jobTitle,'%')
AND cm.Name like CONCAT('%',company,'%')
AND find_in_set(jcm.Name, IFNULL(NULLIF(jobCategoryFilter,''),(select group_concat(Name) FROM jobcategorymaster)))
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


IF EXISTS (SELECT 1 FROM jobapplications WHERE StudentId = Student_Id and JobId = (select MIN(Id) from jobData)) THEN 
	SET IsCurrentStudentAlreadyApplied = "True";
ELSE 
	SET IsCurrentStudentAlreadyApplied = "False";
END IF;
DROP TABLE IF EXISTS firstJobDetails;

CREATE TEMPORARY TABLE firstJobDetails
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
WHERE jd.Id = (select MIN(Id) from jobData)
GROUP BY jd.Id
	,jd.JobTitle
    ,com.Name
    ,cm.Name
    ,sm.Name
;
select *,IsCurrentStudentAlreadyApplied from firstJobDetails;

END //

DELIMITER ;