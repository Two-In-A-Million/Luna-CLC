import fs from 'node:fs/promises';

import express from 'express';
import pool from './db.js';
<<<<<<< Updated upstream
=======
import { json } from 'node:stream/consumers';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
app.post('/get-skill-list', async(req, res) => {
  const {charDetail} = req.body;

  const baseJobId = await pool.query("\
      SELECT\
        jl.job_id\
      FROM\
        job_list jl\
      WHERE\
        jl.race != 'Devil'\
        AND jl.level != 145 \
        AND jl.level = 0\
        AND jl.race = '"+charDetail.race+"'\
        AND jl.job_name = '"+charDetail.class+"'\
    ");


  const jobIds = Object.entries(charDetail)
    .filter(([key, value]) => key.startsWith('jobId') && value !== 'None')
    .map(([, value]) => value);

  jobIds.push(baseJobId.rows[0]?.job_id);

  const skills = await pool.query(
    `
        SELECT\
            jl.job_name,\
            jl.race,\
            js.skill_id,\
            regexp_replace(s.skill_name, '\^s', ' ', 'g') AS skill_name,\
            st.skill_tooltip,\
            regexp_replace(sb1.skill_name, '\^s', ' ', 'g') AS buff1,\
            regexp_replace(sb2.skill_name, '\^s', ' ', 'g') AS buff2,\
            regexp_replace(sb3.skill_name, '\^s', ' ', 'g') AS buff3,\
          regexp_replace(sb4.skill_name, '\^s', ' ', 'g') AS buff4,\
            regexp_replace(sb5.skill_name, '\^s', ' ', 'g') AS buff5\
        FROM job_list jl\
          JOIN job_skill js\
              ON jl.job_id = js.job_id\
          JOIN skills s\
              ON s.skill_idx = js.skill_id\
          JOIN skill_tooltip st\
              ON st.skill_idx = s.skill_idx\
          LEFT JOIN skills_buff sb1\
              ON s.buff_id_1 = sb1.skill_idx\
          LEFT JOIN skills_buff sb2\
              ON s.buff_id_2 = sb2.skill_idx\
          LEFT JOIN skills_buff sb3\
              ON s.buff_id_3 = sb3.skill_idx\
          LEFT JOIN skills_buff sb4\
              ON s.buff_id_4 = sb4.skill_idx\
          LEFT JOIN skills_buff sb5\
              ON s.buff_id_5 = sb5.skill_idx\
        WHERE\
          jl.job_id = ANY($1)\
          AND jl.race = $2\
        ORDER BY\
            jl.level,\
            jl.race,\
            s.skill_idx\
      `,
      [jobIds, charDetail.race]
    );

  res.status(200).json({query: skills.rows})
});

>>>>>>> Stashed changes
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
