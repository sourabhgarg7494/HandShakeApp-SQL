DROP PROCEDURE GetApplicationData

CALL GetApplicationData('test@sjsu.edu','')

DELIMITER //

CREATE PROCEDURE GetApplicationData(IN UserId varchar(500),jobStatusFilter varchar(4000))
BEGIN    
    SELECT jd.JobTitle
		,cd.CompanyName
        ,asm.Name AS ApplicationStatus
        ,date_format(ja.ApplicationDate,'%b %e') as ApplicationDate
        ,date_format(jd.ApplicationDeadLineDate,'%b %e') as ApplicationDeadLineDate
	FROM jobapplications ja
    INNER JOIN users usr on usr.Id = ja.StudentId
    INNER JOIN applicationstatusmaster asm on asm.Id = ja.ApplicationStatusId
    INNER JOIN jobdetails jd on jd.Id = ja.JobId
    INNER JOIN companydetails cd on cd.CompanyId = jd.CompanyId
    where usr.EmailId = UserId 
    and find_in_set(asm.Name,IFNULL(NULLIF(jobStatusFilter,''),(select group_concat(Name) FROM applicationstatusmaster)));
    
    select COUNT(1) as JobCount FROM jobapplications ja 
    inner join users usr on usr.Id = ja.StudentId
    where usr.EmailId = UserId;
    
END; //

DELIMITER ;