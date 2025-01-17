drop procedure getuserdetailbyemailid 
delimiter //

create procedure getuserdetailbyemailid (in emailid varchar(500))
begin
	select emailid,password,passwordsalt,ur.name as userrole from users usr
    left join userroles ur on ur.id = usr.roleid
    where usr.emailid = emailid;
end //

delimiter ;
