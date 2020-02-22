CREATE TABLE EventStudentMapping(
	Id INT auto_increment Not NULL primary KEY
    , EventId INT
    , StudentId bigint
);

ALTER TABLE EventStudentMapping
ADD CONSTRAINT FK_EventMaster_EventStudentMapping
foreign key (EventId)
references EventMaster(Id);


ALTER TABLE EventStudentMapping
ADD CONSTRAINT FK_Users_EventStudentMapping
foreign key (StudentId)
references Users(Id);