Create Table StudentResume(
	Id INT Auto_Increment Primary Key
    ,StudentId bigint
    ,ResumePath varchar(500) character set utf8mb4 NOT NULL
    ,Filename varchar(200) character set utf8mb4 not null
    ,DateUploaded DATE
);

alter table StudentResume
add constraint FK_Studentresume_users
Foreign Key (StudentId)
References Users(Id);