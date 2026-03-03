\echo '------------------------------------'
\echo 'RUNNING SCRIPT FOR SKILL BUFF'
\echo '------------------------------------'
BEGIN;
DROP TABLE IF EXISTS skills_buff;

CREATE TEMP TABLE skills_buff_tmp (
    skill_idx           INTEGER,
    skill_name          TEXT,
    skill_level         INTEGER,
    skill_image         INTEGER,
    skill_tooltip       INTEGER,
    buff_effect         INTEGER,
    kind                INTEGER,
    delay_time          TEXT,
    empty_1             INTEGER,
    weapon              INTEGER,
    armor               INTEGER,
    status              INTEGER,
    status_data_type    INTEGER,
    status_data_value   TEXT,
    condition_type      INTEGER,
    condition_operator  INTEGER,
    condition_value     INTEGER,
    battle              INTEGER,
    peace               INTEGER,
    move                INTEGER,
    stop                INTEGER,
    rest                INTEGER,
    die                 INTEGER,
    no_update           INTEGER,
    use_item_1          INTEGER,
    use_item_2          INTEGER,
    use_item_id_1       INTEGER,
    use_item_id_2       INTEGER,
    money               INTEGER,
    mana                TEXT,
    life                INTEGER,
    count               INTEGER,
    count_type          INTEGER,
    end_time            TEXT
);

COPY skills_buff_tmp
FROM '/script/CSV/skillBuffList.csv'
DELIMITER ','
CSV;

CREATE TABLE IF NOT EXISTS skills_buff (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_idx           INTEGER,
    skill_name          TEXT,
    skill_level         INTEGER,
    skill_image         INTEGER,
    skill_tooltip       INTEGER,
    buff_effect         INTEGER,
    kind                INTEGER,
    delay_time          TEXT,
    empty_1             INTEGER,
    weapon              INTEGER,
    armor               INTEGER,
    status              INTEGER,
    status_data_type    INTEGER,
    status_data_value   TEXT,
    condition_type      INTEGER,
    condition_operator  INTEGER,
    condition_value     INTEGER,
    battle              INTEGER,
    peace               INTEGER,
    move                INTEGER,
    stop                INTEGER,
    rest                INTEGER,
    die                 INTEGER,
    no_update           INTEGER,
    use_item_1          INTEGER,
    use_item_2          INTEGER,
    use_item_id_1       INTEGER,
    use_item_id_2       INTEGER,
    money               INTEGER,
    mana                TEXT,
    life                INTEGER,
    count               INTEGER,
    count_type          INTEGER,
    end_time            TEXT
);

INSERT INTO skills_buff (
    skill_idx,
    skill_name,
    skill_level,
    skill_image,
    skill_tooltip,
    buff_effect,
    kind,
    delay_time,
    empty_1,
    weapon,
    armor,
    status,
    status_data_type,
    status_data_value,
    condition_type,
    condition_operator,
    condition_value,
    battle,
    peace,
    move,
    stop,
    rest,
    die,
    no_update,
    use_item_1,
    use_item_2,
    use_item_id_1,
    use_item_id_2,
    money,
    mana,
    life,
    count,
    count_type,
    end_time
)
SELECT
    skill_idx,
    replace(skill_name, '^s', ' '),
    skill_level,
    skill_image,
    skill_tooltip,
    buff_effect,
    kind,
    delay_time,
    empty_1,
    weapon,
    armor,
    status,
    status_data_type,
    status_data_value,
    condition_type,
    condition_operator,
    condition_value,
    battle,
    peace,
    move,
    stop,
    rest,
    die,
    no_update,
    use_item_1,
    use_item_2,
    use_item_id_1,
    use_item_id_2,
    money,
    mana,
    life,
    count,
    count_type,
    end_time
FROM skills_buff_tmp;

DO $$
DECLARE
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM skills_buff;
    RAISE NOTICE 'Inserted % rows into skills_buff', total_count;
END $$;

COMMIT;