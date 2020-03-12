DROP PROCEDURE getMasterDataJobPosting
CALL getMasterDataJobPosting()

DELIMITER //

CREATE PROCEDURE getMasterDataJobPosting ()
BEGIN
select Name from jobcategorymaster Order by OrderId;

END //

DELIMITER ;
