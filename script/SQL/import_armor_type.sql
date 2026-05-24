\echo '------------------------------------'
\echo 'RUNNING SCRIPT FOR armor TYPE'
\echo '------------------------------------'

BEGIN;
DROP TABLE IF EXISTS armor_type;

CREATE TABLE IF NOT EXISTS armor_type (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    equip_id        INTEGER,
    equip_name    TEXT
);

-- 2. Clear existing data
TRUNCATE TABLE armor_type RESTART IDENTITY;

-- 3. Import fresh data
COPY armor_type (
    equip_id,
    equip_name
)
FROM '/script/CSV/armor_type.csv'
DELIMITER ','
CSV;

-- simple count output
DO $$
DECLARE
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM armor_type;
    RAISE NOTICE 'Inserted % rows into armor_type', total_count;
END $$;

COMMIT;

