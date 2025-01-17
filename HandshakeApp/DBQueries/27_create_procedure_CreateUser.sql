drop procedure createuser
delimiter //

create procedure createuser (in school varchar(500)
				,firstname varchar(100)
                ,lastname varchar(100)
                ,emailaddress varchar(500)
                ,major varchar(200)
                ,gradmonth varchar(10)
                ,gradyear varchar(4)
                ,password varchar(4000)
                ,passwodsalt varchar(4000)
                ,role varchar(50))
begin
	declare roleid int;
    declare studentid int;
    declare schoolid int;
    declare majorid int;
    
	declare exit handler for sqlexception rollback;
    
    start transaction;
		set roleid = (select id from userroles where name = role);
		
		insert into users (emailid, password, passwordsalt, roleid) 
		values (emailaddress,password,passwodsalt,roleid);
		
		set studentid = (select id from users where emailid = emailaddress);
		
		insert into studentdetails (studentid,firstname,lastname)
		values (studentid,firstname,lastname);
		
		set schoolid = (select  id from schoolmaster where name = school);
		set majorid = (select id from majormaster where name = major);
		
		insert into studenteducationdetailsmapping (studentid,schoolid,enddate,majorid)
		values (studentid,schoolid,str_to_date(concat(gradmonth,' ',gradyear),'%m %y'),majorid);
    commit;
end; //

delimiter ;
