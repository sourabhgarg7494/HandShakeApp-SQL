Create table StudentSkillMapping(
	Id int auto_increment Not NULL Primary Key
    , StudentId bigint 
    , SkillId int
);

Alter table studentskillmapping
Add Constraint FK_StudentSkillMApping_SkillMaster
FOREIGN KEY (SkillId)
REFERENCES skillmaster(Id);


Alter table studentskillmapping
Add Constraint FK_StudentSkillMApping_Users
FOREIGN KEY (StudentId)
REFERENCES Users(Id);