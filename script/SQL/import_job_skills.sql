\echo '------------------------------------'
\echo 'RUNNING SCRIPT FOR JOB SKILL'
\echo '------------------------------------'
BEGIN;
DROP TABLE IF EXISTS job_skill;

CREATE TEMP TABLE job_skill_raw (
    job_id INTEGER,
    skill_count INTEGER,
    skills TEXT
);

-- 2. Clear existing data
TRUNCATE TABLE job_skill_raw RESTART IDENTITY;

-- 3. Import fresh data
COPY job_skill_raw (
    job_id,
    skill_count,
    skills
)
FROM '/script/CSV/job_skill_raw.csv'
DELIMITER ','
CSV;

CREATE TABLE IF NOT EXISTS job_skill (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_id INTEGER,
    skill_count INTEGER,
    skill_id INTEGER
);

INSERT INTO job_skill (job_id, skill_count, skill_id)
SELECT
    job_id,
    skill_count,
    skill::INTEGER
FROM job_skill_raw
CROSS JOIN LATERAL unnest(
    string_to_array(skills, ',')
) AS skill;

SELECT job_id,
       skill_count AS declared,
       COUNT(*)    AS actual
FROM job_skill
GROUP BY job_id, skill_count
HAVING COUNT(*) <> skill_count;

DO $$
DECLARE
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM job_skill;
    RAISE NOTICE 'Inserted % rows into job_skill', total_count;
END $$;

COMMIT;