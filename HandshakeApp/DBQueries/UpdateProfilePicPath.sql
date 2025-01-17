drop procedure updateprofilepicpath

delimiter //

create procedure updateprofilepicpath (in userid varchar(500),profilepicpath varchar(500))
begin

	declare userrole varchar(50);
    
    set userrole = (select ur.name 
					from userroles ur 
                    inner join users usr on usr.roleid = ur.id
                    where usr.emailid = userid
                    );
	
    if (userrole = 'student')
    then 
		update studentdetails sd
		inner join users usr on usr.id = sd.studentid
		set sd.profilepicturepath = profilepicpath
		where usr.emailid = userid;
                
		select profilepicturepath from studentdetails sd
		inner join users usr on usr.id = sd.studentid
		where usr.emailid = userid ;
	else
		update companydetails cd
        inner join users usr on usr.id = cd.companyid
        set cd.profilepicturepath = profilepicpath
        where usr.emailid = userid;
        
		select profilepicturepath from companydetails cd
		inner join users usr on usr.id = cd.companyid
		where usr.emailid = userid ;

	end if;
    
    
end; //

delimiter ;
