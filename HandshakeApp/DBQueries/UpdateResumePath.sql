drop procedure updateresumepath

delimiter //

create procedure updateresumepath (in userid varchar(500),resume_path varchar(500),originalfilename varchar (200))
begin
	declare studentid int;
    
    set studentid = (select id from users where emailid = userid);
    
    insert into studentresume (studentid,resumepath,filename,dateuploaded) values (studentid,resume_path,originalfilename,curdate());
    
    select id,resumepath,filename from studentresume where studentid = studentid and resumepath = resume_path;
    
end; //

delimiter ;
