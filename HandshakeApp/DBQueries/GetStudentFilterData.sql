DROP PROCEDURE GetStudentFilterData 
CALL GetStudentFilterData ('','','',1,10,'test@sjsu.edu')

DELIMITER //

CREATE PROCEDURE GetStudentFilterData (IN Studentname VARCHAR(500)
								, SchoolName varchar(4000)
                                , Major varchar(4000)
                                , startIndex int
                                , rowCount int
                                , UserId varchar(500))
BEGIN
DROP TABLE IF EXISTS searchData;
CREATE TEMPORARY TABLE searchData
select * FROM 
	(
SELECT row_number() over (Order by sd.FullName ASC) as row_num
		,sd.FullName
        ,sd.ProfilePicturePath
		,SDEM.StudentId
        ,date_format(SDEM.EndDate,'%M, %Y') as GradDate
        ,sm.Name AS SchoolName
        ,mm.Name as MajorName 
        ,seml.CompanyName
        ,seml.Title
        ,usr.EmailId
FROM studenteducationdetailsmapping SDEM
INNER JOIN (select StudentId, MAX(EndDate) as EndDate
			FROM studenteducationdetailsmapping 
			GROUP BY StudentId) SDF ON SDF.StudentId = SDEM.StudentId AND SDF.EndDate = SDEM.EndDate
INNER JOIN schoolmaster sm on sm.Id = SDEM.SchoolId
INNER JOIN majormaster mm on mm.Id = SDEM.MajorId
INNER JOIN (select Concat(FirstName,' ',LastName) as FullName
				  , StudentId, ProfilePicturePath
			FROM studentdetails) sd ON sd.StudentId = SDEM.StudentId
INNER JOIN users usr on usr.ID = sd.StudentId
LEFT JOIN ( SELECT sem.* FROM studentexperiencemapping sem
			INNER JOIN ( select StudentId, MAX(EndDate) as EndDate
			FROM studentexperiencemapping 
            GROUP BY StudentId) SEML ON SEML.StudentId = SEM.StudentID AND SEML.EndDate = SEM.EndDate
            ) SEML ON seml.StudentId = sd.StudentId
WHERE find_in_set(mm.Name, IFNULL(NULLIF(Major,''),(select group_concat(Name) FROM MajorMAster)))
AND find_in_set(sm.Name, IFNULL(NULLIF(SchoolName,''),(select group_concat(Name) FROM Schoolmaster)))  
AND usr.EmailId not like UserId          
AND 1 = case when IFNULL(StudentName,'') = '' then 1
			when sd.FullName like CONCAT('%',StudentName,'%') then 1
            else 0 end
    ) as stu;


select * from searchData WHERE row_num >= startIndex
LIMIT rowCount;

select CEIL(COUNT(1)/rowCount) as pageCount FROM searchData ;

END //

DELIMITER ;

