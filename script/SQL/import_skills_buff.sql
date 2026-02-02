BEGIN;

CREATE TABLE IF NOT EXISTS skills_buff (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_idx           INTEGER,
    skill_name          TEXT NOT NULL,
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
    end_time            INTEGER
);

-- 2. Clear existing data
TRUNCATE TABLE skills_buff RESTART IDENTITY;

-- 3. Import fresh data
COPY skills_buff (
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
FROM '/script/CSV/skillBuffList.csv'
DELIMITER ','
CSV;

COMMIT;