DROP PROCEDURE insertNewJob
CALL insertNewJob('sjsuusername','title','20-Dec-2020','USA','California','San Jose','address',113,'descrip',',Full Time,Part Time')
DELIMITER //

CREATE PROCEDURE insertNewJob (IN UserId varchar(500)
						,job_title varchar(100)
                        ,ApplicationDeadLine_Date varchar(20)
                        ,Country varchar(100)
						,state varchar(100)
                        ,City varchar(100)
                        ,Addressnew varchar(500)
                        ,salarynew decimal(13,2)
                        ,jobDescriptionnew varchar(4000)
                        ,jobcategories varchar(4000))
BEGIN
	
    DECLARE state_id INT;
    DECLARE city_Id INT;
    DECLARE country_ID INT;
    DECLARE Company_Id INT;
    DECLARE new_JobId int;
    
    SET state_id = (SELECT Id from statemaster where name =state);
    
    SET city_Id = (SELECT Id from citymaster where name =City);
    
    SET country_ID = (SELECT Id from countrymaster where name =Country);
    
    SET Company_Id = (SELECT Id from users where EmailId =UserId);
    
    INSERT INTO JobDetails (JobTitle,PostingDate,ApplicationDeadLineDate,CountryId,StateId,CityId,Address,Salary,JobDescription,CompanyId)
    VALUES (job_title,CURDATE(),str_to_date(ApplicationDeadLine_Date,'%e-%b-%Y'),country_ID,state_id,city_Id,Addressnew,salarynew,jobDescriptionnew,Company_Id);
    
    SET new_JobId = (select Id from JobDetails where CompanyId = Company_Id order by Id DESC LIMIT 1);
    
	drop temporary table if exists tempCategories;
	create temporary table tempCategories( category varchar(255) );
    
	set @sqlquery = concat("insert into tempCategories (category) values ('", replace(jobcategories, ",", "'),('"),"');");
	prepare query1 from @sqlquery;
	execute query1;
    
    INSERT INTO jobcategorymapping (JobId,JobCategoryId)
    SELECT new_JobId, jcm.Id
    FROM jobcategorymaster jcm
    INNER JOIN tempCategories tc on tc.category = jcm.Name;
    
END; //

DELIMITER ;