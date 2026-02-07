import fs from 'node:fs/promises';

import express from 'express';
import pool from './db.js';
import { json } from 'node:stream/consumers';

const app = express();

app.use(express.json()); 
// app.use(express.static('images'));
// app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/get-all-skill', async(req, res) => {
    const test = await pool.query("SELECT * FROM job_skill");
    // const testJson = await test.json();


    res.status(200).json({text: 'hello', query: test})

})

/*
---GET ALL JOB LIST---
*/

app.get('/get-all-job-list', async(req, res) => {
    const jobs = await pool.query("\
      SELECT\
        jl.race,\
        jl.job_name,\
        jl.level,\
        jl.job_id\
      FROM\
        job_list jl\
      WHERE\
        jl.race != 'Devil'\
        AND level != 145 \
    ");

    res.status(200).json({text: 'job-list', query: jobs})
});

/*
---GET JOB LIST---

request:
{
  "charDetail": {
    "race": "Human",
    "class": "Fighter"
  }
}
*/

app.post('/get-job-list', async(req, res) => {
  const {charDetail} = req.body;
  const jobs = await pool.query("\
      SELECT\
        jl.race,\
        jl.job_name,\
        jl.level,\
        jl.job_id\
      FROM\
        job_list jl\
      WHERE\
        jl.race != 'Devil'\
        AND jl.level != 145 \
        AND jl.level != 0\
        AND jl.race = '"+charDetail.race+"'\
        AND LEFT(jl.job_id::text,2 ) = (\
          SELECT\
            LEFT(jl.job_id::text,2)\
          FROM\
            job_list jl\
          WHERE\
            jl.race = '"+charDetail.race+"'\
            AND jl.job_name = '"+charDetail.class+"'\
        )\
    ");

  res.status(200).json({text: 'job-list', query: jobs.rows})
});


/*
---GET SKILL LIST---

request:
{
  "charDetail": {
    "race": "Human",
    "class": "Fighter",
    "jobId20": "1111",
    "jobId40": "1121"
  }
}
*/

app.post('/get-skill-list', async(req, res) => {
  const {charDetail} = req.body;
  const jobIds = Object.entries(charDetail)
    .filter(([key, value]) => key.startsWith('jobId') && value !== 'None')
    .map(([, value]) => value);

  const skills = await pool.query(
    `
        SELECT
            jl.job_name,
            js.skill_id,
            replace(s.skill_name, '^s', ' ') AS skill_name,
            substr(js.skill_id::text, length(js.skill_id::text) - 1)::int as max_level,
            substr(js.skill_id::text, 0, length(js.skill_id::text) - 1)::int as skill_id_trim
        FROM job_list jl
            JOIN job_skill js
                ON jl.job_id = js.job_id
            JOIN skills s
                ON s.skill_idx = js.skill_id
        WHERE
            jl.job_id = ANY($1)
            AND jl.race = $2
        ORDER BY
            jl.race,
            jl.level,
            s.skill_idx
      `,
      [jobIds, charDetail.race]
    );

  res.status(200).json({query: skills.rows})
});

function parseSkillPayload(input) {
  return {
    query: input.map(row => {
      const result = {
        skill_name: row.skill_name,
        skill_tooltip: row.skill_tooltip,
        skill_point: row.skill_point,
        skill_money: row.skill_money,
        range: row.range,
        equiptype: row.equiptype,
        unitdata: row.unitdata
      };

      for (let i = 1; i <= 5; i++) {
        result[`buff${i}`] = {
          buffname: row[`buffname${i}`],
          buffrate: row[`buffrate${i}`],
          buffstatus: row[`buffstatus${i}`],
          buffstatusdata: row[`buffstatusdata${i}`],
          buffdelaytime: row[`buffdelaytime${i}`] ?? null
        };
      }

      return result;
    })
  };
}

/*
---GET SKILL LIST DETAIL---
request:
{
  "skill": {
    "skillId": 2101201
  }
}
*/

app.post('/get-skill-list-detail', async(req, res) => {
  const {skill} = req.body;

  const skills = await pool.query(
    `
        SELECT
            replace(s.skill_name, '^s', ' ') AS skill_name,
            st.skill_tooltip,
            s.train_point as skill_point,
            s.train_money as skill_money,
            s.range as range,
            s.equip as equiptype,
            s.unit_data_type as unitdata,
            s.animation_time,
            s.casting_time,
            s.cool_time as cooldown,
            replace(sb1.skill_name, '^s', ' ') AS buffname1,
            s.rate_buff_1 as buffrate1,
            sb1.status_data_value as buffstatusdata1, 
            sb1.delay_time as buffdelaytime1,
            se1.status_name as buffstatus1,
            replace(sb2.skill_name, '^s', ' ') AS buffname2,
            s.rate_buff_2 as buffrate2,
            sb2.status_data_value as buffstatusdata2,
            sb2.delay_time as buffdelaytime2,
            se2.status_name as buffstatus2,
            replace(sb3.skill_name, '^s', ' ') AS buffname3,
            s.rate_buff_3 as buffrate3,
            sb3.status_data_value as buffstatusdata3,
            sb3.delay_time as buffdelaytime3,
            se3.status_name as buffstatus3,
            replace(sb4.skill_name, '^s', ' ') AS buffname4,
            s.rate_buff_4 as buffrate4,
            sb4.status_data_value as buffstatusdata4,
            sb4.delay_time as buffdelaytime4, 
            se4.status_name as buffstatus4,
            replace(sb5.skill_name, '^s', ' ') AS buffname5,
            s.rate_buff_5 as buffrate5,
            sb5.status_data_value as buffstatusdata5,
            sb5.delay_time as buffdelaytime5,
            se5.status_name as buffstatus5
        FROM 
          skills s
          JOIN skill_tooltip st
              ON st.skill_idx = s.skill_tooltip
          LEFT JOIN skills_buff sb1
              ON s.buff_id_1 = sb1.skill_idx
          LEFT JOIN status_effect se1
              ON sb1.status = se1.status_id
          LEFT JOIN skills_buff sb2
              ON s.buff_id_2 = sb2.skill_idx
          LEFT JOIN status_effect se2
              ON sb2.status = se2.status_id
          LEFT JOIN skills_buff sb3
              ON s.buff_id_3 = sb3.skill_idx
          LEFT JOIN status_effect se3
              ON sb3.status = se3.status_id
          LEFT JOIN skills_buff sb4
              ON s.buff_id_4 = sb4.skill_idx
          LEFT JOIN status_effect se4
              ON sb4.status = se4.status_id
          LEFT JOIN skills_buff sb5
              ON s.buff_id_5 = sb5.skill_idx
          LEFT JOIN status_effect se5
              ON sb5.status = se5.status_id
        where
          s.skill_idx = $1
        ORDER BY
          s.skill_idx
      `,
      [skill.skillId]
    );

  res.status(200).json(parseSkillPayload(skills.rows));
});

// app.get('/places', async (req, res) => {
//   const fileContent = await fs.readFile('./data/places.json');

//   const placesData = JSON.parse(fileContent);

//   res.status(200).json({ places: placesData });
// });

// app.get('/user-places', async (req, res) => {
//   const fileContent = await fs.readFile('./data/user-places.json');

//   const places = JSON.parse(fileContent);

//   res.status(200).json({ places });
// });

// app.put('/user-places', async (req, res) => {
//   const places = req.body.places;

//   await fs.writeFile('./data/user-places.json', JSON.stringify(places));

//   res.status(200).json({ message: 'User places updated!' });
// });


app.listen(3000);
