\echo '------------------------------------'
\echo 'RUNNING SCRIPT FOR weapon TYPE'
\echo '------------------------------------'

BEGIN;
DROP TABLE IF EXISTS weapon_type;

CREATE TABLE IF NOT EXISTS weapon_type (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    equip_id        INTEGER,
    equip_name    TEXT
);

-- 2. Clear existing data
TRUNCATE TABLE weapon_type RESTART IDENTITY;

-- 3. Import fresh data
COPY weapon_type (
    equip_id,
    equip_name
)
FROM '/script/CSV/weapon_type.csv'
DELIMITER ','
CSV;

-- simple count output
DO $$
DECLARE
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM weapon_type;
    RAISE NOTICE 'Inserted % rows into weapon_type', total_count;
END $$;

COMMIT;

