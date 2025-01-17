drop procedure getcompanyuserdata

call getcompanyuserdata('sjsuusername')

delimiter //

create procedure getcompanyuserdata(in userid varchar(500))
begin
	
    select cd.companyid
		,cd.companyname
        ,cd.address
        ,com.name as country
        ,sm.name as state
        ,cm.name as city
        ,cd.description
        ,cd.phone
        ,cd.profilepicturepath
        ,usr.emailid
    from companydetails cd
    inner join users usr on usr.id = cd.companyid
    inner join countrymaster com on com.id = cd.countryid
    inner join statemaster sm on sm.id = cd.stateid
    inner join citymaster cm on cm.id = cd.cityid
    where usr.emailid = userid;
    
end; //

delimiter ;
