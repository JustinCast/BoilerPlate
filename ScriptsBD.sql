CREATE OR REPLACE FUNCTION AddCompanyRebeca(_name VARCHAR(25), _address VARCHAR(25), _tel VARCHAR(20))
RETURNS VOID
AS $$
BEGIN
    IF NOT EXISTS ( SELECT * FROM company WHERE company.name LIKE _name) THEN
        INSERT INTO company(name, address, tel) VALUES (_name, _address, _tel);
    END IF;
END; $$
LANGUAGE 'plpgsql';

SELECT AddCompanyRebeca('Coocique', 'San Carlos Alajuela', '24607843');


CREATE OR REPLACE FUNCTION getCompaniesRebeca()
RETURNS TABLE(id int, name character varying, address character varying, tel character varying)
AS $$
BEGIN
    RETURN QUERY SELECT
        company.id AS id,
        company.name AS name,
        company.address AS address,
        company.tel AS telephone
    FROM company;
END; $$
LANGUAGE 'plpgsql';

SELECT getCompaniesRebeca()