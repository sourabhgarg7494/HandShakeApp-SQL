drop procedure getcompanyeventstudentlist
call getcompanyeventstudentlist(1)

delimiter //

create procedure getcompanyeventstudentlist (event_id int)
begin

drop table if exists firsteventdetails;

create temporary table firsteventdetails
select distinct em.id
	,sd.studentid
    ,usr.emailid
	,concat(sd.firstname,' ', sd.lastname) as fullname 
from eventstudentmapping esm
inner join eventmaster em on em.id = esm.eventid
inner join studentdetails sd on sd.studentid = esm.studentid
inner join users usr on usr.id = sd.studentid
where em.id = event_id;

select *  from firsteventdetails;

    
end; //

delimiter ;
