Create table JobApplications(
	Id BigInt auto_increment not NULL Primary key
    ,JobId Int
    ,StudentId BigInt
    ,StudentResumeId Int
    ,ApplicationStatusId Int
);

ALTER TABLE JobApplications
Add CONSTRAINT FK_JobDetails_JobApplication
FOREIGN KEY (JobId)
References JobDetails(Id);

ALTER TABLE JobApplications
Add CONSTRAINT FK_Users_JobApplication
FOREIGN KEY (StudentId)
References Users(Id);

ALTER TABLE JobApplications
Add CONSTRAINT FK_StudentResume_JobApplication
FOREIGN KEY (StudentResumeId)
References StudentResume(Id);

ALTER TABLE JobApplications
Add CONSTRAINT FK_ApplicationStatusMaster_JobApplication
FOREIGN KEY (ApplicationStatusId)
References applicationstatusmaster(Id);