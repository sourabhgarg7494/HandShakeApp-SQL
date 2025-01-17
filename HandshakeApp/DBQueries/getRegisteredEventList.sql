drop procedure getregisteredeventlist 

call getregisteredeventlist('test@sjsu.edu')

delimiter //

create procedure getregisteredeventlist(in userid varchar(500))
begin    

	declare eventcount int;

    select em.eventname
		,cd.companyname
		,date_format(em.dateandtime, "%b %d") as eventdate
		,date_format(em.dateandtime, "%r") as eventtime
        ,em.address
        ,sm.name state
        ,cm.name city
    from eventstudentmapping esm
    inner join eventmaster em on em.id = esm.eventid
    inner join companydetails cd on cd.companyid = em.companyid
    inner join statemaster sm on sm.id = em.stateid
    inner join citymaster cm on cm.id = em.cityid
    inner join users usr on usr.id = esm.studentid
    where usr.emailid = userid;

    select count(*) as eventcount from eventstudentmapping esm
    inner join users usr on usr.id = esm.studentid
    where usr.emailid = userid;
    
end; //

delimiter ;
