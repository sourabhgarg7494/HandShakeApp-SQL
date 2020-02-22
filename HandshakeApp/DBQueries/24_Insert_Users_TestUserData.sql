use handshakeapp;

INSERT INTO users (EmailId,Password,PasswordSalt,RoleId) 
values ('test@sjsu.edu','$2b$10$V6.SwZ7mdUnm610QNIWsbeaF6XBM9RX94nwI7dvM2GLoKE38P4bGG','nOYDKgcCFBvnRXlFhKkfYVfPQJZEuQny'
		,(select Id FROM Userroles where Name = 'Student')
		);
            