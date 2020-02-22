
Create table JobCategoryMapping(
	Id bigint auto_increment Not NULL primary Key
    ,JobId int
    ,JobCategoryId Int
);

ALTER TABLE jobcategoryMapping
Add Constraint FK_JobDetails_JobCategoryMapping
Foreign Key (JobId)
REFERENCES JobDetails(Id);


ALTER TABLE jobcategoryMapping
Add Constraint FK_JobCategoryMaster_JobCategoryMapping
Foreign Key (JobCategoryId)
REFERENCES jobcategorymaster(Id);