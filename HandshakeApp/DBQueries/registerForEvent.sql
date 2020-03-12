DROP PROCEDURE registerForEvent

CALL registerForEvent(1, 'test@sjsu.edu')

DELIMITER //

CREATE PROCEDURE registerForEvent(IN Event_Id INT, UserId varchar(500))
BEGIN
	DECLARE StudentId int;
    
    SET StudentId = (SELECT ID from users where EmailId = UserId);
    
    INSERT INTO eventStudentMapping (EventId,StudentId)
    VALUES (Event_Id,StudentId);
    
END; //

DELIMITER ;