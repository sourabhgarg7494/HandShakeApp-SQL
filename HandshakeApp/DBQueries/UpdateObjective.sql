DROP PROCEDURE UpdateObjective 

DELIMITER //

CREATE PROCEDURE UpdateObjective(IN UserId varchar(500),Objective varchar(1000))
BEGIN

    DECLARE student_ID INT;
    
    SET student_ID = (SELECT Id from users where EmailId =UserId);
	UPDATE studentdetails SET CarrerObjective = Objective where StudentId = student_ID;
    
END; //

DELIMITER ;