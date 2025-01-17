drop procedure updateeducationdata 

delimiter //

create procedure updateeducationdata (in userid varchar(500)
						,school_name varchar(100)
                        , major_name varchar(100)
                        , cumulative_gpa varchar(4))
begin
	
    declare school_id int;
    declare major_id int;
    declare student_id int;
    
    set school_id = (select id from schoolmaster where name =school_name);
    
    set major_id = (select id from majormaster where name =major_name);
    
    set student_id = (select id from users where emailid =userid);
    
    if (school_id is not null and school_id != 0)
    then
		update studenteducationdetailsmapping set schoolid = school_id  where studentid =  student_id;
    end if;
    
    if (major_id is not null and major_id != 0)
    then
		update studenteducationdetailsmapping set majorid = major_id  where studentid =  student_id;
    end if;
    
    if(cumulative_gpa is not null and cumulative_gpa !='')
    then
		update studenteducationdetailsmapping set cumulativegpa = cumulative_gpa where studentid =  student_id;
	end if;
    
end; //

delimiter ;
