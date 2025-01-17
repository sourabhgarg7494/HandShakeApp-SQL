drop procedure insertnewevent
call insertnewevent('sjsuusername','eventname','description','20-dec-2020: 12:30','usa','california','san jose','address',',computer engineering,chemical engineering,electric engineering,industrial engineering,software engineering')
delimiter //

create procedure insertnewevent (in userid varchar(500)
						,event_name varchar(250)
                        ,descriptionnew varchar(2000)
                        ,dateandtime varchar(100)
						,country varchar(100)
                        ,state varchar(100)
                        ,city varchar(100)
                        ,addressnew varchar(500)
                        ,eligiblemajors varchar(4000))
begin
	
    declare state_id int;
    declare city_id int;
    declare country_id int;
    declare company_id int;
    declare new_eventid int;
    
    set state_id = (select id from statemaster where name =state);
    
    set city_id = (select id from citymaster where name =city);
    
    set country_id = (select id from countrymaster where name =country);
    
    set company_id = (select id from users where emailid =userid);
    
    insert into eventmaster (eventname,description,dateandtime,countryid,stateid,cityid,address,companyid)
    values (event_name,descriptionnew,str_to_date(dateandtime,'%e-%b-%y: %l:%i'),country_id,state_id,city_id,addressnew,company_id);
    
    set new_eventid = (select id from eventmaster where companyid = company_id order by id desc limit 1);
    
	drop temporary table if exists tempmajors;
	create temporary table tempmajors( major varchar(200) );
    
	set @sqlquery = concat("insert into tempmajors (major) values ('", replace(eligiblemajors, ",", "'),('"),"');");
	prepare query1 from @sqlquery;
	execute query1;
    
    insert into eventeligiblemajormapping (eventid,eligiblemajorid)
    select new_eventid, mm.id
    from majormaster mm
    inner join tempmajors tm on tm.major = mm.name;
    
end; //

delimiter ;
