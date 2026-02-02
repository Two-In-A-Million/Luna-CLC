import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "lunaCalculator",
  host: "localhost",
  database: "luna",
  password: "201007",
  port: 5432,
});

// Optional: Log errors on idle clients
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;

