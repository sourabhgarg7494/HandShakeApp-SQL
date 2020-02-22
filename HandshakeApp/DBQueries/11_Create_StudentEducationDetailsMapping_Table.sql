create table StudentEducationDetailsMapping(
	Id INT auto_increment NOT NULL Primary Key
    ,StudentId bigint
    ,SchoolId bigint
    ,StartDate Date
    ,EndDate Date
    ,MajorId Int
    ,DepartmentGPA Double
    ,CumulativeGPA Double
);

ALTER TABLE StudentEducationDetailsMapping
Add constraint FK_StudentEducationDetailsMapping_Users
FOREIGN KEY (StudentId)
References Users(Id);

ALTER TABLE StudentEducationDetailsMapping
Add constraint FK_Schoolmaster_Users
FOREIGN KEY (SchoolId)
References Schoolmaster(Id);

ALTER TABLE StudentEducationDetailsMapping
Add constraint FK_Majormaster_Users
FOREIGN KEY (MajorId)
References majormaster(Id);