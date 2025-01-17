drop procedure updateexperiencedata
call updateexperiencedata ('check@user.com','new company name',)
delimiter //

create procedure updateexperiencedata (in userid varchar(500)
						,company_name varchar(200)
                        ,titlenew varchar(200)
                        ,addressnew varchar(500)
						,state varchar(100)
                        ,city varchar(100)
                        ,country varchar(100)
                        ,startdatenew varchar(20)
                        ,enddatenew varchar(20)
                        ,workdescriptionnew varchar(1000))
begin
	
    declare state_id int;
    declare city_id int;
    declare country_id int;
    declare student_id int;
    
    set state_id = (select id from statemaster where name =state);
    
    set city_id = (select id from citymaster where name =city);
    
    set country_id = (select id from countrymaster where name =country);
    
    set student_id = (select id from users where emailid =userid);
    
    if exists (select 1 from studentexperiencemapping where studentid = student_id)
    then		
		if (state_id is not null and state_id != 0)
		then
			update studentexperiencemapping set stateid = state_id  where studentid =  student_id;
		end if;
        if (city_id is not null and city_id != 0)
		then
			update studentexperiencemapping set cityid = city_id  where studentid =  student_id;
		end if;
        if (country_id is not null and country_id != 0)
		then
			update studentexperiencemapping set countryid = country_id  where studentid =  student_id;
		end if;
        if (company_name is not null and company_name != '')
		then
			update studentexperiencemapping set companyname = company_name  where studentid =  student_id;
		end if;
        if (titlenew is not null and titlenew != '')
		then
			update studentexperiencemapping set title = titlenew  where studentid =  student_id;
		end if;
        if (addressnew is not null and addressnew != '')
		then
			update studentexperiencemapping set address = addressnew  where studentid =  student_id;
		end if;
        if (startdatenew is not null and startdatenew != '')
		then
			update studentexperiencemapping set startdate = str_to_date(concat(startdatenew),'%b-%y')  where studentid =  student_id;
		end if;
        if (enddatenew is not null and enddatenew != '')
		then
			update studentexperiencemapping set enddate = str_to_date(concat(enddatenew),'%b-%y')  where studentid =  student_id;
		end if;
        if (workdescriptionnew is not null and workdescriptionnew != '')
		then
			update studentexperiencemapping set workdescription = workdescriptionnew  where studentid =  student_id;
		end if;
	else
		insert into studentexperiencemapping (studentid,companyname,title,address,stateid,cityid,countryid,startdate,enddate,workdescription)
        values (student_id,company_name,titlenew,addressnew,state_id,city_id,country_id,str_to_date(concat(startdatenew),'%b-%y'),str_to_date(concat(enddatenew),'%b-%y'),workdescriptionnew);
    end if;
    
end; //

delimiter ;
