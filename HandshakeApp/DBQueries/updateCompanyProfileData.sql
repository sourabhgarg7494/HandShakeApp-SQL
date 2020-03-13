DROP PROCEDURE updateCompanyProfileData

DELIMITER //

CREATE PROCEDURE updateCompanyProfileData (IN UserId varchar(500)
						,company_name varchar(300)
                        ,Addressnew varchar(500)
                        ,Country varchar(100)
						,state varchar(100)
                        ,City varchar(100)
                        ,descriptionnew varchar(1000)
                        ,phonenew varchar(20))
BEGIN
	
    DECLARE state_id INT;
    DECLARE city_Id INT;
    DECLARE country_ID INT;
    DECLARE Company_Id INT;
    
    SET state_id = (SELECT Id from statemaster where name =state);
    
    SET city_Id = (SELECT Id from citymaster where name =City);
    
    SET country_ID = (SELECT Id from countrymaster where name =Country);
    
    SET Company_Id = (SELECT Id from users where EmailId =UserId);
    		
		if (state_id is not NULL and state_id != 0)
		THEN
			UPDATE companydetails SET stateId = state_id  where CompanyId =  Company_Id;
		END IF;
        if (city_Id is not NULL and city_Id != 0)
		THEN
			UPDATE companydetails SET CityId = city_Id  where CompanyId =  Company_Id;
		END IF;
        if (country_ID is not NULL and country_ID != 0)
		THEN
			UPDATE companydetails SET CountryId = country_ID  where CompanyId =  Company_Id;
		END IF;
        if (company_name is not NULL and company_name != '')
		THEN
			UPDATE companydetails SET CompanyName = company_name  where CompanyId =  Company_Id;
		END IF;
        if (descriptionnew is not NULL and descriptionnew != '')
		THEN
			UPDATE companydetails SET Description = descriptionnew  where CompanyId =  Company_Id;
		END IF;
        if (Addressnew is not NULL and Addressnew != '')
		THEN
			UPDATE companydetails SET Address = Addressnew  where CompanyId =  Company_Id;
		END IF;
        if (phonenew is not NULL and phonenew != '')
		THEN
			UPDATE companydetails SET Phone = phonenew  where CompanyId =  Company_Id;
		END IF;
    
END; //

DELIMITER ;