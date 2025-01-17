drop procedure createcompanyuser;
delimiter //

create procedure createcompanyuser (in companyname varchar(300)
                ,emailaddress varchar(500)
                ,country varchar(100)
                ,state varchar(100)
                ,city varchar(100)
                ,address varchar(500)
                ,phone varchar(20)
                ,description varchar(1000)
                ,password varchar(4000)
                ,passwodsalt varchar(4000)
                ,role varchar(50))
begin
	declare roleid int;
    declare companyid int;
    declare countryid int;
    declare stateid int;
    declare cityid int;
    
	declare exit handler for sqlexception rollback;
    
    start transaction;
		set roleid = (select id from userroles where name = role);
		
		insert into users (emailid, password, passwordsalt, roleid) 
		values (emailaddress,password,passwodsalt,roleid);
		
		set companyid = (select id from users where emailid = emailaddress);
        set countryid = (select id from countrymaster where name = country);
        set stateid = (select id from statemaster where name = state);
        set cityid = (select id from citymaster where name = city);
		
		insert into companydetails (companyid,companyname,address,countryid,stateid,cityid,description,phone)
		values (companyid,companyname,address,countryid,stateid,cityid,description,phone);
        
    commit;
end; //

delimiter ;
