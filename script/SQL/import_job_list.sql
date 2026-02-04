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

COMMIT;

