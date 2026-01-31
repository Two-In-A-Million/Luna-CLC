BEGIN;

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

COMMIT;