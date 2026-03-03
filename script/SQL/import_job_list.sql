\echo '------------------------------------'
\echo 'RUNNING SCRIPT FOR JOB LIST'
\echo '------------------------------------'

BEGIN;
DROP TABLE IF EXISTS job_list;

CREATE TABLE IF NOT EXISTS job_list (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_id        INTEGER,
    job_name    TEXT,
    race        TEXT,
    level       INTEGER
);

-- 2. Clear existing data
TRUNCATE TABLE job_list RESTART IDENTITY;

-- 3. Import fresh data
COPY job_list (
    job_id,
    job_name,
    race,
    level
)
FROM '/script/CSV/job_list.csv'
DELIMITER ','
CSV;

-- simple count output
DO $$
DECLARE
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM job_list;
    RAISE NOTICE 'Inserted % rows into job_list', total_count;
END $$;

COMMIT;

