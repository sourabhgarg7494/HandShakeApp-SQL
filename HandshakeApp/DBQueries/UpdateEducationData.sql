DROP PROCEDURE UpdateEducationData 

DELIMITER //

CREATE PROCEDURE UpdateEducationData (IN UserId varchar(500),school_Name varchar(100), major_Name varchar(100))
BEGIN
	
    DECLARE school_id INT;
    DECLARE major_Id INT;
    DECLARE student_ID INT;
    
    SET school_id = (SELECT Id from schoolmaster where name =school_Name);
    
    SET major_Id = (SELECT Id from majormaster where name =major_name);
    
    SET student_ID = (SELECT Id from users where EmailId =UserId);
    
    if (school_id is not NULL or school_id != 0)
    THEN
		UPDATE studenteducationdetailsmapping SET SchoolId = school_id  where StudentId =  student_ID;
    END IF;
    
    if (major_Id IS NOT NULL or major_Id != 0)
    THEN
		UPDATE studenteducationdetailsmapping SET majorId = Major_Id  where StudentId =  student_ID;
    END IF;
    
END; //

DELIMITER ;