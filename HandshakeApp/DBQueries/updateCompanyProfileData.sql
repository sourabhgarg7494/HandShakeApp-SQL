drop procedure updatecompanyprofiledata

delimiter //

create procedure updatecompanyprofiledata (in userid varchar(500)
						,company_name varchar(300)
                        ,addressnew varchar(500)
                        ,country varchar(100)
						,state varchar(100)
                        ,city varchar(100)
                        ,descriptionnew varchar(1000)
                        ,phonenew varchar(20))
begin
	
    declare state_id int;
    declare city_id int;
    declare country_id int;
    declare company_id int;
    
    set state_id = (select id from statemaster where name =state);
    
    set city_id = (select id from citymaster where name =city);
    
    set country_id = (select id from countrymaster where name =country);
    
    set company_id = (select id from users where emailid =userid);
    		
		if (state_id is not null and state_id != 0)
		then
			update companydetails set stateid = state_id  where companyid =  company_id;
		end if;
        if (city_id is not null and city_id != 0)
		then
			update companydetails set cityid = city_id  where companyid =  company_id;
		end if;
        if (country_id is not null and country_id != 0)
		then
			update companydetails set countryid = country_id  where companyid =  company_id;
		end if;
        if (company_name is not null and company_name != '')
		then
			update companydetails set companyname = company_name  where companyid =  company_id;
		end if;
        if (descriptionnew is not null and descriptionnew != '')
		then
			update companydetails set description = descriptionnew  where companyid =  company_id;
		end if;
        if (addressnew is not null and addressnew != '')
		then
			update companydetails set address = addressnew  where companyid =  company_id;
		end if;
        if (phonenew is not null and phonenew != '')
		then
			update companydetails set phone = phonenew  where companyid =  company_id;
		end if;
    
end; //

delimiter ;
