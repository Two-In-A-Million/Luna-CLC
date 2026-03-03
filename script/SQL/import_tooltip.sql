
\echo '------------------------------------'
\echo 'RUNNING SCRIPT FOR STATUS SKILL TOOLTIP'
\echo '------------------------------------'

BEGIN;
DROP TABLE IF EXISTS skill_tooltip;

CREATE TABLE IF NOT EXISTS skill_tooltip (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_idx        INTEGER,
    skill_tooltip    TEXT
);

-- 2. Clear existing data
TRUNCATE TABLE skill_tooltip RESTART IDENTITY;

-- 3. Import fresh data
COPY skill_tooltip (
    skill_idx,
    skill_tooltip
)
FROM '/script/CSV/tooltip.csv'
DELIMITER ','
CSV;

DO $$
DECLARE
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM skill_tooltip;
    RAISE NOTICE 'Inserted % rows into skill_tooltip', total_count;
END $$;

COMMIT;