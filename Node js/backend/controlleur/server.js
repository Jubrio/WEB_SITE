import express from 'express';
import cors from 'cors';
import pool from '../db.js';

const app = express();
app.use(cors());
app.use(express.json());

/* AJOUT */
app.post('/ventes', async (req, res) => {
  const { design, prix, quantite } = req.body;

  try {
    await pool.query(
      'INSERT INTO vente(design, prix, quantite) VALUES($1,$2,$3)',
      [design, prix, quantite]
    );
    res.json({ message: "Insertion réussie" });
  } catch {
    res.json({ message: "Insertion échouée" });
  }
});

/* AFFICHAGE */
app.get('/ventes', async (req, res) => {
  const result = await pool.query('SELECT * FROM vente');
  res.json(result.rows);
});

/* SUPPRIMER */
app.delete('/ventes/:id', async (req, res) => {
  await pool.query('DELETE FROM vente WHERE id=$1', [req.params.id]);
  res.json({ message: "Suppression réussie" });
});

/* MODIFIER */
app.put('/ventes/:id', async (req, res) => {
  const { design, prix, quantite } = req.body;

  await pool.query(
    'UPDATE vente SET design=$1, prix=$2, quantite=$3 WHERE id=$4',
    [design, prix, quantite, req.params.id]
  );

  res.json({ message: "Modification réussie" });
});

/* BILAN */
app.get('/bilan', async (req, res) => {
  const result = await pool.query(`
    SELECT 
      MIN(prix*quantite) as min,
      MAX(prix*quantite) as max,
      SUM(prix*quantite) as total
    FROM vente
  `);

  res.json(result.rows[0]);
});

/* INSCRIPTION */
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    await pool.query(
      'INSERT INTO utilisateur(username, password) VALUES($1,$2)',
      [username, password]
    );
    res.json({ success: true, message: "Utilisateur créé" });
  } catch (err) {
    res.json({ success: false, message: "Utilisateur existe déjà" });
  }
});

/* LOGIN */
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    'SELECT * FROM utilisateur WHERE username=$1 AND password=$2',
    [username, password]
  );

  if (result.rows.length > 0) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(3000, () => console.log("🚀 Serveur lancé"));