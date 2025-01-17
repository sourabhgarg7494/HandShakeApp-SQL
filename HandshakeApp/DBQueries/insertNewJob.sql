drop procedure insertnewjob
call insertnewjob('sjsuusername','title','20-dec-2020','usa','california','san jose','address',113,'descrip',',full time,part time')
delimiter //

create procedure insertnewjob (in userid varchar(500)
						,job_title varchar(100)
                        ,applicationdeadline_date varchar(20)
                        ,country varchar(100)
						,state varchar(100)
                        ,city varchar(100)
                        ,addressnew varchar(500)
                        ,salarynew decimal(13,2)
                        ,jobdescriptionnew varchar(4000)
                        ,jobcategories varchar(4000))
begin
	
    declare state_id int;
    declare city_id int;
    declare country_id int;
    declare company_id int;
    declare new_jobid int;
    
    set state_id = (select id from statemaster where name =state);
    
    set city_id = (select id from citymaster where name =city);
    
    set country_id = (select id from countrymaster where name =country);
    
    set company_id = (select id from users where emailid =userid);
    
    insert into jobdetails (jobtitle,postingdate,applicationdeadlinedate,countryid,stateid,cityid,address,salary,jobdescription,companyid)
    values (job_title,curdate(),str_to_date(applicationdeadline_date,'%e-%b-%y'),country_id,state_id,city_id,addressnew,salarynew,jobdescriptionnew,company_id);
    
    set new_jobid = (select id from jobdetails where companyid = company_id order by id desc limit 1);
    
	drop temporary table if exists tempcategories;
	create temporary table tempcategories( category varchar(255) );
    
	set @sqlquery = concat("insert into tempcategories (category) values ('", replace(jobcategories, ",", "'),('"),"');");
	prepare query1 from @sqlquery;
	execute query1;
    
    insert into jobcategorymapping (jobid,jobcategoryid)
    select new_jobid, jcm.id
    from jobcategorymaster jcm
    inner join tempcategories tc on tc.category = jcm.name;
    
end; //

delimiter ;
