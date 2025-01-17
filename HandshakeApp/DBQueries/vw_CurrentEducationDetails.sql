create view vw_currenteducationdetails
as
select concat(sd.firstname,' ',sd.lastname) as fullname
		,sdem.studentid
        ,date_format(sdem.enddate,'%m, %y') as garddate
        ,sm.name as schoolname
        ,mm.name as majorname 
        ,seml.companyname
        ,seml.title
from studenteducationdetailsmapping sdem
inner join (select studentid, max(enddate) as enddate
			from studenteducationdetailsmapping 
			group by studentid) sdf on sdf.studentid = sdem.studentid and sdf.enddate = sdem.enddate
inner join schoolmaster sm on sm.id = sdem.schoolid
inner join majormaster mm on mm.id = sdem.majorid
inner join studentdetails sd on sd.studentid = sdem.studentid
left join ( select sem.* from studentexperiencemapping sem
			inner join ( select studentid, max(enddate) as enddate
			from studentexperiencemapping 
            group by studentid) seml on seml.studentid = sem.studentid and seml.enddate = sem.enddate
            ) seml on seml.studentid = sd.studentid
            
            
select * from studentexperiencemapping
insert into studentexperiencemapping (studentid,companyname,title,address,stateid,cityid,countryid,startdate,enddate,workdescription)
values (1,'firstcompany','sd','address line first comp',1,1,1,'2016-05-00','2018-05-00','work description first comp')


insert into studentexperiencemapping (studentid,companyname,title,address,stateid,cityid,countryid,startdate,enddate,workdescription)
values (1,'secondcompany','sd','address line second comp',1,1,1,'2018-06-00','2020-06-00','work description second comp')
            

