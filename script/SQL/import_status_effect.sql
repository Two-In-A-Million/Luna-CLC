
\echo '------------------------------------'
\echo 'RUNNING SCRIPT FOR STATUS EFFECT'
\echo '------------------------------------'
BEGIN;
DROP TABLE IF EXISTS status_effect;

CREATE TABLE IF NOT EXISTS status_effect (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    status_name TEXT,
    status_id   INTEGER
);

-- 2. Clear existing data
TRUNCATE TABLE status_effect RESTART IDENTITY;

-- 3. Import fresh data
COPY status_effect (
    status_name,
    status_id
)
FROM '/script/CSV/status_effect.csv'
DELIMITER ','
CSV;

DO $$
DECLARE
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM status_effect;
    RAISE NOTICE 'Inserted % rows into status_effect', total_count;
END $$;

COMMIT;

