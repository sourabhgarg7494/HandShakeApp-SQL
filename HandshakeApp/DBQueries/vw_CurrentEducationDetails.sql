CREATE VIEW vw_CurrentEducationDetails
AS
SELECT Concat(sd.FirstName,' ',sd.LastName) as FullName
		,SDEM.StudentId
        ,date_format(SDEM.EndDate,'%M, %Y') as GardDate
        ,sm.Name AS SchoolName
        ,mm.Name as MajorName 
        ,seml.CompanyName
        ,seml.Title
FROM studenteducationdetailsmapping SDEM
INNER JOIN (select StudentId, MAX(EndDate) as EndDate
			FROM studenteducationdetailsmapping 
			GROUP BY StudentId) SDF ON SDF.StudentId = SDEM.StudentId AND SDF.EndDate = SDEM.EndDate
INNER JOIN schoolmaster sm on sm.Id = SDEM.SchoolId
INNER JOIN majormaster mm on mm.Id = SDEM.MajorId
INNER JOIN studentdetails sd ON sd.StudentId = SDEM.StudentId
LEFT JOIN ( SELECT sem.* FROM studentexperiencemapping sem
			INNER JOIN ( select StudentId, MAX(EndDate) as EndDate
			FROM studentexperiencemapping 
            GROUP BY StudentId) SEML ON SEML.StudentId = SEM.StudentID AND SEML.EndDate = SEM.EndDate
            ) SEML ON seml.StudentId = sd.StudentId
            
            
select * from StudentExperienceMapping
INSERT INTO StudentExperienceMapping (StudentId,CompanyName,Title,Address,StateId,CityId,CountryId,StartDate,EndDate,WorkDescription)
values (1,'FirstCompany','SD','Address line First Comp',1,1,1,'2016-05-00','2018-05-00','Work Description first Comp')


INSERT INTO StudentExperienceMapping (StudentId,CompanyName,Title,Address,StateId,CityId,CountryId,StartDate,EndDate,WorkDescription)
values (1,'SecondCompany','SD','Address line Second Comp',1,1,1,'2018-06-00','2020-06-00','Work Description second Comp')
            

