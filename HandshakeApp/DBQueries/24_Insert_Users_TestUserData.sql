use handshakeapp;

insert into users (emailid,password,passwordsalt,roleid) 
values ('test@sjsu.edu','$2b$10$v6.swz7mdunm610qniwsbeaf6xbm9rx94nwi7dvm2gloke38p4bgg','noydkgccfbvnrxlfhkkfyvfpqjzeuqny'
		,(select id from userroles where name = 'student')
		);
            
