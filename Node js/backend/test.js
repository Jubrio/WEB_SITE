import pool from './db.js';

const res = await pool.query('SELECT NOW()');
console.log('Connecté:', res.rows);

await pool.end();