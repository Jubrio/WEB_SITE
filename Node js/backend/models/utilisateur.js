import pool from '../db.js';

await pool.query(`
CREATE TABLE IF NOT EXISTS utilisateur (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(100)
);
`);

console.log("✅ Table utilisateur créée");
process.exit();