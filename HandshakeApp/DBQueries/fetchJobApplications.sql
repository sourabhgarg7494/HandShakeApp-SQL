DROP PROCEDURE fetchJobApplications
CALL fetchJobApplications (2)

DELIMITER //

CREATE PROCEDURE fetchJobApplications (Job_Id INT)
BEGIN

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
WHERE jd.Id = Job_Id
;
select * from firstJobDetails;

END //

DELIMITER ;