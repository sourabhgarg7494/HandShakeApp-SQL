DROP PROCEDURE updateExperienceData
CALL updateExperienceData ('check@user.com','New Company Name',)
DELIMITER //

CREATE PROCEDURE updateExperienceData (IN UserId varchar(500)
						,company_name varchar(200)
                        ,titlenew varchar(200)
                        ,Addressnew varchar(500)
						,state varchar(100)
                        ,City varchar(100)
                        ,Country varchar(100)
                        ,StartDatenew varchar(20)
                        ,EndDatenew varchar(20)
                        ,workDescriptionnew varchar(1000))
BEGIN
	
    DECLARE state_id INT;
    DECLARE city_Id INT;
    DECLARE country_ID INT;
    DECLARE Student_Id INT;
    
    SET state_id = (SELECT Id from statemaster where name =state);
    
    SET city_Id = (SELECT Id from citymaster where name =City);
    
    SET country_ID = (SELECT Id from countrymaster where name =Country);
    
    SET Student_Id = (SELECT Id from users where EmailId =UserId);
    
    if exists (select 1 FROM studentexperiencemapping where StudentId = Student_ID)
    THEN		
		if (state_id is not NULL and state_id != 0)
		THEN
			UPDATE studentexperiencemapping SET stateId = state_id  where StudentId =  Student_Id;
		END IF;
        if (city_Id is not NULL and city_Id != 0)
		THEN
			UPDATE studentexperiencemapping SET CityId = city_Id  where StudentId =  Student_Id;
		END IF;
        if (country_ID is not NULL and country_ID != 0)
		THEN
			UPDATE studentexperiencemapping SET CountryId = country_ID  where StudentId =  Student_Id;
		END IF;
        if (company_name is not NULL and company_name != '')
		THEN
			UPDATE studentexperiencemapping SET CompanyName = company_name  where StudentId =  Student_Id;
		END IF;
        if (titlenew is not NULL and titlenew != '')
		THEN
			UPDATE studentexperiencemapping SET Title = titlenew  where StudentId =  Student_Id;
		END IF;
        if (Addressnew is not NULL and Addressnew != '')
		THEN
			UPDATE studentexperiencemapping SET Address = Addressnew  where StudentId =  Student_Id;
		END IF;
        if (StartDatenew is not NULL and StartDatenew != '')
		THEN
			UPDATE studentexperiencemapping SET StartDate = str_to_date(CONCAT(StartDatenew),'%b-%Y')  where StudentId =  Student_Id;
		END IF;
        if (EndDatenew is not NULL and EndDatenew != '')
		THEN
			UPDATE studentexperiencemapping SET EndDate = str_to_date(CONCAT(EndDatenew),'%b-%Y')  where StudentId =  Student_Id;
		END IF;
        if (workDescriptionnew is not NULL and workDescriptionnew != '')
		THEN
			UPDATE studentexperiencemapping SET WorkDescription = workDescriptionnew  where StudentId =  Student_Id;
		END IF;
	else
		INSERT INTO studentexperiencemapping (StudentId,CompanyName,Title,Address,StateId,CityId,CountryId,StartDate,EndDate,WorkDescription)
        VALUES (Student_Id,company_name,titlenew,Addressnew,state_id,city_Id,country_ID,str_to_date(CONCAT(StartDatenew),'%b-%Y'),str_to_date(CONCAT(EndDatenew),'%b-%Y'),workDescriptionnew);
    END IF;
    
END; //

DELIMITER ;