DROP PROCEDURE deleteUserSkill

DELIMITER //

CREATE PROCEDURE deleteUserSkill (IN UserId varchar(500), skill varchar(400))
BEGIN
    DECLARE usrId int;
    
    set usrId = (select Id FROM users where emailId = UserId) ;
    
    IF EXISTS (SELECT ID from skillmaster where Name = skill) THEN 
		DELETE FROM studentskillmapping WHERE StudentId = usrId AND SkillId = (SELECT ID from skillmaster where Name = skill);
	END IF; 
    
END; //

DELIMITER ;