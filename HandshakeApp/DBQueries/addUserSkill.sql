DROP PROCEDURE addUserSkill

DELIMITER //

CREATE PROCEDURE addUserSkill (IN UserId varchar(500), skill varchar(400))
BEGIN
    DECLARE usrId int;
    DECLARE Order_Id INt;
    set usrId = (select Id FROM users where emailId = UserId) ;
    set Order_ID = (select MAX(OrderId) + 1 FROM SkillMaster);
    
    IF EXISTS (SELECT ID from skillmaster where Name = skill) THEN 
		INSERT INTO studentskillmapping (StudentId,SkillId) values (usrId,(SELECT ID from skillmaster where Name = skill));
	ELSE 
    
		INSERT INTO skillmaster (Name,OrderId) VALUES (skill,Order_ID);
        INSERT INTO studentskillmapping (StudentId,SkillId) values (usrId,(SELECT ID from skillmaster where Name = skill));
	END IF; 
    
END; //

DELIMITER ;