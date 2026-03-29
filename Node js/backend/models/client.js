import pool from '../db.js';

await pool.query(`
CREATE TABLE IF NOT EXISTS vente (
  id SERIAL PRIMARY KEY,
  design VARCHAR(100),
  prix NUMERIC,
  quantite INT
);
`);

console.log("✅ Table vente créée");
process.exit();