DROP PROCEDURE updateStatus

DELIMITER //

CREATE PROCEDURE updateStatus (IN Status varchar(20),Job_Id int, Student_Id int)
BEGIN

	DECLARE StatusId int;
    
    SET StatusId = (SELECT Id from applicationstatusmaster where Name = Status);
	
    if (StatusId is not null AND StatusId !='')
    THEN 
		UPDATE jobapplications ja
		SET ja.ApplicationStatusId = StatusId
		WHERE ja.JobId = Job_Id and ja.StudentId = Student_ID;
	END IF;
    
    
END; //

DELIMITER ;