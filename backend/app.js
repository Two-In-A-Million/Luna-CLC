import fs from 'node:fs/promises';

import express from 'express';
import pool from './db.js';

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
