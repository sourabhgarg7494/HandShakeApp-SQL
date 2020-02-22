CREATE table EventEligibleMajorMapping(
	Id INT auto_increment Not NULL Primary KEY
    ,EventId INT
    ,EligibleMajorId INT
);

ALTER TABLE EventEligibleMajorMapping
Add Constraint FK_EventMaster_EventEligibleMajotMapping
FOREIGN KEY (EventId)
REFERENCES EventMaster(Id);

ALTER TABLE EventEligibleMajorMapping
Add Constraint FK_MajorMster_EventEligibleMajotMapping
FOREIGN KEY (EligibleMajorId)
REFERENCES majormaster(Id);
