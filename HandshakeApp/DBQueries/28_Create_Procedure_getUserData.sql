drop procedure getuserdata

call getuserdata('test@sjsu.edu')

delimiter //

create procedure getuserdata (in userid varchar(500))
begin
	
    select carrerobjective from studentdetails sd
    inner join users usr on usr.id = sd.studentid
    where usr.emailid = userid;
    
    select usr.emailid ,gm.name as gender from users usr 
    left join studentdetails sd on sd.studentid = usr.id
    left join gendermaster gm on gm.id = sd.genderid
    where usr.emailid = userid;
	
	select firstname, lastname,sm.name as schoolname, mm.name as major, sedm.cumulativegpa,sd.profilepicturepath from studentdetails sd
    left join studenteducationdetailsmapping sedm on sedm.studentid = sd.studentid
    left join schoolmaster sm on sm.id = sedm.schoolid
    left join majormaster mm on mm.id = sedm.majorid
    inner join users usr on usr.id = sedm.studentid
    where usr.emailid = userid
    order by sedm.startdate desc limit 1;
    
    select sm.name as schoolname, date_format(startdate,'%m %y') as startdate
    ,date_format(enddate,'%m %y') as enddate
    ,mm.name as major
    ,cumulativegpa 
    from studenteducationdetailsmapping sedm
    left join schoolmaster sm on sm.id = sedm.schoolid
    left join majormaster mm on mm.id = sedm.majorid
    inner join users usr on usr.id = sedm.studentid
    where usr.emailid = userid;
    
    select sm.name from studentskillmapping ssm
    inner join skillmaster sm on sm.id = ssm.skillid
    inner join users usr on usr.id = ssm.studentid
    where usr.emailid = userid;
    
    select sem.companyname
		,sem.title
        ,sem.address
        ,sm.name as state
        ,cm.name as city
        ,com.name as country
        ,date_format(sem.startdate,'%b-%y') as startdate
        ,date_format(sem.enddate,'%b-%y') as enddate
        ,sem.workdescription
    from studentexperiencemapping sem
    left join statemaster sm on sm.id = sem.stateid
    left join citymaster cm on cm.id = sem.cityid
    left join countrymaster com on com.id = sem.countryid
    inner join users usr on usr.id = sem.studentid
    where usr.emailid = userid;
    
end; //

delimiter ;
