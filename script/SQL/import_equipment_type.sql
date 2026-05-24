\echo '------------------------------------'
\echo 'RUNNING SCRIPT FOR EQUIPMENT TYPE'
\echo '------------------------------------'

BEGIN;
DROP TABLE IF EXISTS equipment_type;

CREATE TABLE IF NOT EXISTS equipment_type (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    equip_id        INTEGER,
    equip_name    TEXT
);

-- 2. Clear existing data
TRUNCATE TABLE equipment_type RESTART IDENTITY;

-- 3. Import fresh data
COPY equipment_type (
    equip_id,
    equip_name
)
FROM '/script/CSV/equipment_type.csv'
DELIMITER ','
CSV;

-- simple count output
DO $$
DECLARE
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM equipment_type;
    RAISE NOTICE 'Inserted % rows into equipment_type', total_count;
END $$;

COMMIT;

